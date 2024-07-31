// import axios from "axios";
// import { config } from "../../config/env";
// const { AUTH_API_BASE_URL, AUTH_API_USERNAME, AUTH_API_PASSWORD } = config;

// export const AuthAPI = axios.create({
//   baseURL: AUTH_API_BASE_URL,
//   auth: { username: AUTH_API_USERNAME, password: AUTH_API_PASSWORD },
//   headers: { "Content-Type": "application/json" },
// });

import amqp from 'amqplib';

const RABBITMQ_URL = 'amqp://localhost';
const REPLY_QUEUE = 'amq.rabbitmq.reply-to';

export const verifyToken = async (token: string) => {
  return new Promise((resolve, reject) => {
    amqp.connect(RABBITMQ_URL, (err, connection) => {
      if (err) {
        return reject(err);
      }

      connection.createChannel((err, channel) => {
        if (err) {
          return reject(err);
        }

        channel.assertQueue(REPLY_QUEUE, { exclusive: true }, (err, q) => {
          if (err) {
            return reject(err);
          }

          channel.sendToQueue(
            'auth_queue',
            Buffer.from(token),
            {
              correlationId: token,
              replyTo: REPLY_QUEUE,
            }
          );

          channel.consume(
            REPLY_QUEUE,
            (msg) => {
              if (msg.properties.correlationId === token) {
                const response = JSON.parse(msg.content.toString());
                resolve(response);
                channel.close(() => connection.close());
              }
            },
            { noAck: true }
          );
        });
      });
    });
  });
};
