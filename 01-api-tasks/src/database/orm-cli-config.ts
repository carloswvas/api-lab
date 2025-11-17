import { DataSource } from 'typeorm';
import { dataSourceOptions } from './database.module';
import { CreateTasksTable1762882406662 } from 'src/migrations/1762882406662-CreateTasksTable';

export const dataSource = new DataSource({
  ...dataSourceOptions,
  synchronize: false,
  migrations: [CreateTasksTable1762882406662],
});
