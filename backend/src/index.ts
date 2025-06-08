import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Database connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/annapurna';

// Only attempt to connect to MongoDB if it's required
if (process.env.NODE_ENV !== 'development') {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => {
      console.error('MongoDB connection error:', error);
      console.log('Continuing without MongoDB connection...');
    });
} else {
  console.log('Development mode: MongoDB connection skipped');
}

// Routes
app.get('/', (_req: express.Request, res: express.Response) => {
  res.json({ 
    message: 'Welcome to Annapurna API',
    status: 'Server is running',
    mode: process.env.NODE_ENV || 'development'
  });
});

// Error handling middleware
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
}); 