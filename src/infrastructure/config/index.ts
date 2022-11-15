type Config = {
  nodeEnv: string;
  logLevel: string;
  port: number;
  host: string;
  databaseHost: string;
  databaseUsername: string;
  databasePassword: string;
  databasePort: number;
  databaseName: string;
};

const configFromEnv = (): Config => ({
  nodeEnv: process.env.NODE_ENV || 'local',
  logLevel: process.env.LOG_LEVEL || 'info',
  port: Number(process.env.PORT) || 8080,
  host: '0.0.0.0',
  databaseHost: process.env.DATABASE_HOST || 'localhost',
  databaseUsername: process.env.DATABASE_USERNAME || 'docker',
  databasePassword: process.env.DATABASE_PASSWORD || 'docker',
  databasePort: Number(process.env.DATABASE_PORT) || 3306,
  databaseName: process.env.DATABASE_NAME || 'eleicao_api'
});

export { Config, configFromEnv };
