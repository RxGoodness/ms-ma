// import { connectDB } from "./config/database";
// connectDB();
// import express from "express";
// const app = express();
// import { config } from "./config/env";
// const { APP_NAME } = config;

// app.use(express.urlencoded({ extended: true, limit: "100mb" }));
// app.use(express.json({ limit: "100mb" }));

// // import routers

// // use routers

// app.use("/", async (req, res) => {
//   res.status(200).send({
//     message: `hi ${APP_NAME} here, 👋`,
//   });
// });

// export default app;


import express from 'express';
import mongoose from 'mongoose';
import { initializeRabbitMQ } from './services/MicroserviceConnections/initializeRabbitMQ';
import { connectDB } from './config/database';
// import { initializeRabbitMQ } from '.';

const app = express();

// Middleware
app.use(express.json());

// MongoDB connection
connectDB()
// mongoose.connect('mongodb://localhost:27017/netware-auth', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Initialize RabbitMQ
initializeRabbitMQ();

export default app;
