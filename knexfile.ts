import dotenv from 'dotenv';

dotenv.config();

type Config = {
  [key: string]: {
    client: string;
    connection: {
      host: string;
      port: number;
      user: string;
      password: string;
      database: string;
    };
  };
};

const config: Config = {
  dev: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
  },
  test: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME_TEST,
    },
  },
};

export default config;
