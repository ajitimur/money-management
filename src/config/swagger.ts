import { SwaggerOptions } from 'swagger-ui-express';
import { config } from './index';
import { join } from 'path';

export const swaggerConfig: SwaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Money Management API',
      version: '1.0.0',
      description: 'API documentation for Money Management application',
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      }
    },
    servers: [
      {
        url: `http://localhost:${config.port}/api`,
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: [
    join(__dirname, '../routes/*.{ts,js}'),
    join(__dirname, '../entities/*.{ts,js}')
  ]
}; 