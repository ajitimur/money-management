import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { AppDataSource } from './config/database';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware';
import { config } from './config';
import authRoutes from './routes/auth.routes';
import transactionRoutes from './routes/transaction.routes';
import categoryRoutes from './routes/category.routes';
import subCategoryRoutes from './routes/subcategory.routes';

const app: Express = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/sub-categories', subCategoryRoutes);
app.use('/api/transactions', transactionRoutes);

// Health check
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Database connection and server start
const startServer = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log('Database connected successfully');

    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.error('Error during server startup:', error);
    process.exit(1);
  }
};

startServer();

export default app;