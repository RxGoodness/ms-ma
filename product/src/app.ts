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
import productRoutes from './routes/product';
import { connectDB } from './config/database';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);

// MongoDB connection
connectDB()
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

export default app;
