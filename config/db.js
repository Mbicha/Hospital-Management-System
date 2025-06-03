import mongoose from 'mongoose';
import { config } from './config.js'; // Destructure the exported object

const connectDB = async () => {
  try {
    await mongoose.connect(`${config.mongoURI}${config.dbName}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected to database: ${config.dbName}`);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

export default connectDB;
