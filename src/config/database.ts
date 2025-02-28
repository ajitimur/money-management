import { DataSource } from 'typeorm';
import { config } from './index';
import { join } from 'path';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  synchronize: false,
  logging: config.env === 'development',
  entities: [join(__dirname, '../entities/**/*.{ts,js}')],
  migrations: [join(__dirname, '../../database/migrations/**/*.{ts,js}')],
  subscribers: [join(__dirname, '../subscribers/**/*.{ts,js}')]
}); 