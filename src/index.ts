import * as dotenv from 'dotenv';

import { FastifyInstance } from 'fastify';
import Pino from 'pino';
import { Config, configFromEnv } from './infrastructure/config';
import { newMysqlClient } from './infrastructure/repository/mysql';
import { newFastifyServer } from './infrastructure/server/http/fastify';

dotenv.config();

const initFastifyDependencies = async (config: Config): Promise<FastifyInstance> => {
  const logger = Pino({
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'UTC:yyyy-mm-dd HH:MM:ss.l o'
      }
    }
  });

  await newMysqlClient(logger, config);

  return await newFastifyServer([], logger);
};

const main = async (): Promise<void> => {
  const config = configFromEnv();
  const fastifyHttpServer = await initFastifyDependencies(config);

  try {
    await fastifyHttpServer.listen({ port: config.port, host: config.host });
  } catch (err) {
    fastifyHttpServer.log.error(err);
    process.exitCode = 1;
  }
};

main();
