import * as dotenv from 'dotenv';
import { newFastifyServer } from './infrastructure/server/http/fastify';
import { FastifyInstance, RouteOptions } from 'fastify';
import Pino from 'pino';

import { Config, configFromEnv } from './infrastructure/config';
import { newMysqlClient, newPartidoRepository } from './infrastructure/repository/mysql';
import { partidoUseCases, cargoUseCases, imagemUseCases, eleicaoUseCases, candidatoUseCases } from './usecases';

import * as partidoRoutes from './infrastructure/server/http/fastify/routers/partido';
import * as cargoRoutes from './infrastructure/server/http/fastify/routers/cargo';
import * as imagemRoutes from './infrastructure/server/http/fastify/routers/imagem';
import * as eleicaoRoutes from './infrastructure/server/http/fastify/routers/eleicao';
import * as candidatoRoutes from './infrastructure/server/http/fastify/routers/candidato';

import {
  newEditarPartidoHandler,
  newListarPartidoHandler,
  newRemoverPartidoHandler,
  newInserirPartidoHandler
} from './infrastructure/server/http/fastify/handlers/partido';
import { newCargoRepository } from './infrastructure/repository/mysql/cargo';
import { newListarCargoHandler } from './infrastructure/server/http/fastify/handlers/cargo';
import { newImagemRepository } from './infrastructure/repository/mysql/imagem';
import { newListarImagemHandler } from './infrastructure/server/http/fastify/handlers/imagem';
import { newEleicaoRepository } from './infrastructure/repository/mysql/eleicao';
import {
  newInserirEleicaoHandler,
  newListarCandidatosPorEleicaoHandler,
  newListarEleicaoHandler
} from './infrastructure/server/http/fastify/handlers/eleicao';
import { newCandidatoRepository } from './infrastructure/repository/mysql/candidato';
import {
  newEditarCandidatoHandler,
  newInserirCandidatoHandler
} from './infrastructure/server/http/fastify/handlers/candidato';

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

  const cargoMysqlRepository = newCargoRepository(mysqlClient);
  const listarCargoSvc = cargoUseCases.newListarCargosDb(cargoMysqlRepository);

  const imagemMysqlRepository = newImagemRepository(mysqlClient);
  const listarImagemSvc = imagemUseCases.newListarImagensDb(imagemMysqlRepository);

  const candidatoMysqlRepository = newCandidatoRepository(mysqlClient);
  const inserirCandidatoSvc = candidatoUseCases.newInserirCandidatoDb(candidatoMysqlRepository);
  const editarCandidatoSvc = candidatoUseCases.newEditarCandidatoDb(candidatoMysqlRepository);

  const eleicaoMysqlRepository = newEleicaoRepository(mysqlClient);
  const listarEleicoesSvc = eleicaoUseCases.newListarEleicoesDb(eleicaoMysqlRepository);
  const criarEleicaoSvc = eleicaoUseCases.newInserirEleicaoDb(eleicaoMysqlRepository);

  const routes: RouteOptions[] = [
    partidoRoutes.inserirPartido(newInserirPartidoHandler(inserirPartidoSvc)),
    partidoRoutes.editarPartido(newEditarPartidoHandler(editarPartidoSvc)),
    partidoRoutes.listarPartidos(newListarPartidoHandler(listarPartidosSvc)),
    partidoRoutes.removerPartido(newRemoverPartidoHandler(removerPartidoSvc)),
    cargoRoutes.listarCargos(newListarCargoHandler(listarCargoSvc)),
    imagemRoutes.listarImagens(newListarImagemHandler(listarImagemSvc)),
    candidatoRoutes.editarCandidato(newEditarCandidatoHandler(editarCandidatoSvc)),
    candidatoRoutes.inserirCandidato(newInserirCandidatoHandler(inserirCandidatoSvc)),
    eleicaoRoutes.listarEleicoes(newListarEleicaoHandler(listarEleicoesSvc)),
    eleicaoRoutes.inserirEleicao(newInserirEleicaoHandler(criarEleicaoSvc)),
    eleicaoRoutes.listarCandidatosPorEleicao(newListarCandidatosPorEleicaoHandler(listarEleicoesSvc))
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
