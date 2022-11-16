import { FastifyReply, FastifyRequest } from 'fastify';
import {
  EditarPartidoService,
  InserirPartidoService,
  ListarPartidosService,
  Partido,
  RemoverPartidoService
} from '../../../../../domain/partido';

import { Handler } from './handler';
import { UriParams } from './schemas/partido';

export const newInserirPartidoHandler =
  (svc: InserirPartidoService): Handler =>
  async (request: FastifyRequest, reply: FastifyReply) => {
    const partido = request.body as Partido;
    const createdPartido = await svc.inserirPartido(partido);
    return reply.header('Content-Type', 'application/json').code(201).send(createdPartido);
  };

export const newEditarPartidoHandler =
  (svc: EditarPartidoService): Handler =>
  async (request: FastifyRequest<{ Params: UriParams }>, reply: FastifyReply) => {
    const partido = request.body as Partial<Partido>;
    const partidoId = request.params.id;
    await svc.editarPartido(partido, partidoId);
    return reply.header('Content-Type', 'application/json').code(200).send();
  };

export const newRemoverPartidoHandler =
  (svc: RemoverPartidoService): Handler =>
  async (request: FastifyRequest<{ Params: UriParams }>, reply: FastifyReply) => {
    await svc.removerPartido({ id: request.params.id });
    return reply.code(204).send();
  };

export const newListarPartidoHandler =
  (svc: ListarPartidosService): Handler =>
  async (_: FastifyRequest, reply: FastifyReply) => {
    const partidos = await svc.listarPartidos();
    return reply.header('Content-Type', 'application/json').code(200).send(partidos);
  };

export const newLimparPartidosHandler =
  (svc: RemoverPartidoService): Handler =>
  async (_: FastifyRequest, reply: FastifyReply) => {
    await svc.limparPartidos();
    return reply.code(204).send();
  };
