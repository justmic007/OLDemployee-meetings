import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'user',
  password: 'password',
  database: 'db',
  synchronize: false,
  logging: true,
  entities: ['dist/src/**/*.entity.js'],
  migrations: [
    'dist/src/persistence/migrations/*.ts'
  ],
  cli: {
    migrationsDir: 'dist/src/persistence/migrations'
  }
}

export default config;