import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { AppDataSource } from './config/database.js';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware.js';
import { config } from './config/index.js';
import authRoutes from './routes/auth.routes.js';
import transactionRoutes from './routes/transaction.routes.js';
import categoryRoutes from './routes/category.routes.js';
import subCategoryRoutes from './routes/subcategory.routes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';

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

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Money Management API',
      version: '1.0.0',
      description: 'API documentation for Money Management application',
      contact: {
        name: 'API Support',
        email: 'support@example.com',
      },
    },
    servers: [
      {
        url: `http://localhost:${config.port}`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: [
    path.join(__dirname, '../src/routes/*.ts'),
    path.join(__dirname, '../src/routes/*.js'),
  ],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true,
  customCssUrl: '/custom.css',
  swaggerOptions: {
    displayRequestDuration: true,
    docExpansion: 'none',
    filter: true,
    showCommonExtensions: true,
    persistAuthorization: true,
  }
}));

// Serve swagger spec as JSON
app.get('/api-docs/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

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