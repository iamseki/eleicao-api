import Knex from 'knex';
import { Logger } from 'pino';
import { Config } from '../../config';

export const newMysqlClient = async (logger: Logger, config: Config) => {
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

  try {
    await knex.raw('SELECT now()');
    logger.info('succesfully connected to mysql database');
    return knex;
  } catch (err) {
    logger.error(err);
    throw new Error('Unable to connect to Mysql via Knex. Ensure a valid connection.');
  }
};
