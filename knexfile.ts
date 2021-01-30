import dotenv from 'dotenv';

dotenv.config();

type Config = {
  [key: string]: {
    client: string;
    debug: boolean;
    connection: {
      host: string;
      port: number;
      user: string;
      password: string;
      database: string;
    };
    migrations: {
      tableName: string;
      directory: string;
    };
    seeds?: {
      directory: string;
    };
  };
};

const config: Config = {
  production: {
    client: 'postgresql',
    debug: false,
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      tableName: 'migrations',
      directory: './db/migrations',
    },
  },
  dev: {
    client: 'postgresql',
    debug: false,
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      tableName: 'migrations',
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
  test: {
    client: 'postgresql',
    debug: false,
    connection: {
      host: process.env.DB_HOST_TEST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME_TEST,
    },
    migrations: {
      tableName: 'migrations',
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
};

export default config;
