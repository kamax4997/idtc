import dotenv from 'dotenv';

dotenv.config();

export default {
  // App name
  appName: 'IDT Product Reviews',

  // Server port
  port: process.env.PORT,

  // Secret for cookie sessions
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiration: 360000,

  // Configuration for MongoDB
  mongoUri: process.env.DB_URI,
};
