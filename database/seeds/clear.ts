import { DataSource } from 'typeorm';
import { config } from '../../src/config';

const dataSource = new DataSource({
  type: 'postgres',
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  entities: ['src/entities/**/*.ts'],
});

async function clearDatabase() {
  try {
    await dataSource.initialize();
    console.log('Database connected');

    // Drop all tables
    await dataSource.dropDatabase();
    console.log('Database cleared');

    // Recreate database
    await dataSource.synchronize();
    console.log('Database structure recreated');

    await dataSource.destroy();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error clearing database:', error);
    process.exit(1);
  }
}

clearDatabase(); 