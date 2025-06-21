import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import mealRoutes from './routes/mealRoutes';
import surpriseMeRoutes from './routes/surpriseMeRoutes';
import adminRoutes from './routes/adminRoutes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/surprise-me', surpriseMeRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    status: 'error',
    message: err.message || 'Internal server error',
  });
});

export default app; 