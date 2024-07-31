import { connectDB } from "./config/database";
connectDB();
import express from "express";
const app = express();
import { config } from "./config/env";
const { APP_NAME } = config;

app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(express.json({ limit: "100mb" }));

// import routers

// use routers

app.use("/", async (req, res) => {
  res.status(200).send({
    message: `hi ${APP_NAME} here, 👋`,
  });
});

export default app;
