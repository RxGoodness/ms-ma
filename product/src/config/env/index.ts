import dotenv from "dotenv";
import { schema } from "./schema";
import { Validate } from "./validators";
import { ConfigTypes } from "../types";
dotenv.config();

// validate environment variables
const envVarsSchema = Validate(schema);

const { error, value: envVariables } = envVarsSchema.validate(process.env);
if (error) throw new Error(`Config validation error: ${error.message}`);

export const config: ConfigTypes = {
  NODE_ENV: envVariables.NODE_ENV,
  APP_NAME: envVariables.APP_NAME,
  PORT: envVariables.PORT,
  LOCAL_PORT: envVariables.LOCAL_PORT,
  APP_URL: envVariables.APP_URL,
  MONGODB_URI: envVariables.MONGODB_URI,
  JWT_SECRET: envVariables.JWT_SECRET,
  SESSION_SECRET: envVariables.SESSION_SECRET,
  REFRESH_TOKEN_SECRET: envVariables.REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_VALIDITY: envVariables.ACCESS_TOKEN_VALIDITY,
  REDIS_HOST: envVariables.REDIS_HOST,
  REDIS_PORT: envVariables.REDIS_PORT,
  REDIS_PASSWORD: envVariables.REDIS_PASSWORD,
  REDIS_USERNAME: envVariables.REDIS_USERNAME,
  REDIS_DB: envVariables.REDIS_DB,
  RABBITMQ_URL: envVariables.RABBITMQ_URL,
  REPLY_QUEUE: envVariables.RABBITMQ_URL
};
