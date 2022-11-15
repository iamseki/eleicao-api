import Knex from 'knex';
import { Logger } from 'pino';
import { Config } from '../../config';

export { newPartidoRepository } from './partido';

export const newMysqlClient = async (logger: Logger, config: Config) => {
  const RETRY_LIMIT = 10;

  for (let i = 0; i < RETRY_LIMIT; i++) {
    try {
      const knex = Knex({
        client: 'mysql2',
        connection: {
          user: config.databaseUsername,
          password: config.databasePassword,
          host: config.databaseHost,
          port: config.databasePort,
          database: config.databaseName
        }
      });

      await knex.raw('SELECT now()');
      logger.info('succesfully connected to mysql database');
      return knex;
    } catch (err) {
      logger.error(err);
      logger.info(`RETRY_COUNT=${i}, RETRY_LIMIT=${RETRY_LIMIT}. Trying connect to MYSQL again in 2 seconds...`);
      await new Promise((r) => setTimeout(r, 2000));
    }
  }

  throw new Error('Unable to connect to Mysql via Knex. Ensure a valid connection.');
};
