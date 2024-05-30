import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
    },
    postgres: {
      name: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      host: process.env.POSTGRES_HOST,
    },
    mysql: {
      host: process.env.MYSQL_HOST,
      name: process.env.MYSQL_DATABASE,
      port: parseInt(process.env.MYSQL_PORT, 10),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_ROOT_PASSWORD,
    },
    mongo: {
      name: process.env.MONGODB,
      user: process.env.MONGO_ROOT_USER,
      password: process.env.MONGO_ROOT_PASS,
      port: parseInt(process.env.MONGO_PORT, 10),
      host: process.env.MONGO_HOST,
      connection: process.env.MONGO_CONNECTION,
    },
    apiKey: process.env.API_KEY,
  };
});
