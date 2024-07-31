import amqp from 'amqplib';
import { config } from "../../config/env";

const { RABBITMQ_URL, REPLY_QUEUE } =
  config;

interface ValidationResponse {
  valid: boolean;
  user?: { 
      _id: string;
      email: string;
     // password?: boolean;
     name: string; };
}

// export const verifyToken = async (token: string) => {
export const verifyToken = async (token: string): Promise<ValidationResponse> => {  
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
