import cors from 'cors';
import express from 'express';
import { Router } from './routes';
import config from './config';

// MongoDB configuration
import mongoose from 'mongoose';
import { ErrorHandler } from './middlewares/errorHandler';

const connectDB = () => {
  mongoose.connect(
    config.mongoUri,
    {
      dbName: 'idt-test',
      autoIndex: false, // Don't build indexes
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 10000, // Keep trying to send operations for 10 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4 // Use IPv4, skip trying IPv6
    },
    (err) => {
      if (err) {
        console.log('Mongoose connection error:', err);
        console.log('Retrying to connect...');
        setTimeout(connectDB, 5000);
      }
    }
  );
};

connectDB();
console.log('MongoDB Connected!');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true }));
app.use('/api/v1', Router);
app.use((req, res, next) => {
  return res.status(404).json({
    error: true,
    message: 'Resource Not found',
  });
});
app.use(ErrorHandler);

export default app;
