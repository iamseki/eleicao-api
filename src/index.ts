import * as dotenv from 'dotenv';
import { newFastifyServer } from './infrastructure/server/http/fastify';
import { FastifyInstance, RouteOptions } from 'fastify';
import Pino from 'pino';

import { Config, configFromEnv } from './infrastructure/config';
import { newMysqlClient, newPartidoRepository } from './infrastructure/repository/mysql';
import { partidoUseCases } from './usecases';

import * as partidoRoutes from './infrastructure/server/http/fastify/routers/partido';
import { newInserirPartidoHandler } from './infrastructure/server/http/fastify/handlers';
import {
  newEditarPartidoHandler,
  newListarPartidoHandler,
  newRemoverPartidoHandler
} from './infrastructure/server/http/fastify/handlers/partido';

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

  const mysqlClient = await newMysqlClient(logger, config);

  const partidoMysqlRepository = newPartidoRepository(mysqlClient);
  const inserirPartidoSvc = partidoUseCases.newInserirPartidoDb(partidoMysqlRepository);
  const removerPartidoSvc = partidoUseCases.newDeletarPartidoDb(partidoMysqlRepository);
  const listarPartidosSvc = partidoUseCases.newListarPartidosDb(partidoMysqlRepository);
  const editarPartidoSvc = partidoUseCases.newEditarPartidoDb(partidoMysqlRepository);

  const routes: RouteOptions[] = [
    partidoRoutes.inserirPartido(newInserirPartidoHandler(inserirPartidoSvc)),
    partidoRoutes.editarPartido(newEditarPartidoHandler(editarPartidoSvc)),
    partidoRoutes.listarPartidos(newListarPartidoHandler(listarPartidosSvc)),
    partidoRoutes.removerPartido(newRemoverPartidoHandler(removerPartidoSvc))
  ];

  return await newFastifyServer(routes, logger);
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
