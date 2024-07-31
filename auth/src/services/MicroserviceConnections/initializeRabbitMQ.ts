// import axios from "axios";
// import { config } from "../../config/env";
// const { AUTH_API_BASE_URL, AUTH_API_USERNAME, AUTH_API_PASSWORD } = config;

// export const AuthAPI = axios.create({
//   baseURL: AUTH_API_BASE_URL,
//   auth: { username: AUTH_API_USERNAME, password: AUTH_API_PASSWORD },
//   headers: { "Content-Type": "application/json" },
// });

import amqp from 'amqplib';
import { validateToken } from '../AuthService/authToken'

const RABBITMQ_URL = 'amqp://localhost';

export const initializeRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    const queue = 'auth_queue';

    await channel.assertQueue(queue, { durable: true });

    channel.consume(queue, async (msg) => {
      if (msg !== null) {
        const token = msg.content.toString();
        const validationResponse = validateToken(token);
        const response = validationResponse ? { valid: true, user: validationResponse } : { valid: false };

        channel.sendToQueue(
          msg.properties.replyTo,
          Buffer.from(JSON.stringify(response)),
          {
            correlationId: msg.properties.correlationId,
          }
        );
        channel.ack(msg);
      }
    }, { noAck: false });

    console.log('Auth service is waiting for messages in auth_queue...');
  } catch (error) {
    console.error('Failed to initialize RabbitMQ:', error);
  }
};
