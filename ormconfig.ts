import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
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