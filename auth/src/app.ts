import express from 'express';
import { initializeRabbitMQ } from './services/MicroserviceConnections/initializeRabbitMQ';
import { connectDB } from './config/database';
import authRoutes from './routes/auth';

const app = express();

app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(express.json());

// use routers
app.use('/api/auth', authRoutes);

// MongoDB connection
connectDB()
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Initialize RabbitMQ
initializeRabbitMQ();

export default app;
