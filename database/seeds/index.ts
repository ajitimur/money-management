import { DataSource } from 'typeorm';
import { CategorySeeder } from './CategorySeeder';
import { config } from '../../src/config';
import { RoleSeeder } from './RoleSeeder';
import { UserSeeder } from './UserSeeder';

const dataSource = new DataSource({
  type: 'postgres',
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  entities: ['src/entities/**/*.ts'],
  migrations: ['database/migrations/**/*.ts'],
});

async function runSeeds() {
  try {
    await dataSource.initialize();
    console.log('Database connected');

    const roleSeeder = new RoleSeeder(dataSource);
    await roleSeeder.run();
    console.log('Roles seeded successfully');

    const userSeeder = new UserSeeder(dataSource);
    await userSeeder.run();
    console.log('Users seeded successfully');
    
    const categorySeeder = new CategorySeeder(dataSource);
    await categorySeeder.run();
    console.log('Categories and subcategories seeded successfully');

    await dataSource.destroy();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error running seeds:', error);
    process.exit(1);
  }
}

runSeeds(); 