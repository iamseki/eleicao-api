import { FastifyReply, FastifyRequest } from 'fastify';
import {
  Candidato,
  EditarCandidatoService,
  InserirCandidatoService,
  RemoverCandidatoService
} from '../../../../../domain/candidato';

import { Handler } from './handler';
import { UriParams } from './schemas/partido';

export const newInserirCandidatoHandler =
  (svc: InserirCandidatoService): Handler =>
  async (request: FastifyRequest, reply: FastifyReply) => {
    const candidato = request.body as Candidato;
    const createdCandidato = await svc.inserirCandidato(candidato);
    return reply.header('Content-Type', 'application/json').code(201).send(createdCandidato);
  };

export const newEditarCandidatoHandler =
  (svc: EditarCandidatoService): Handler =>
  async (request: FastifyRequest<{ Params: UriParams }>, reply: FastifyReply) => {
    const candidato = request.body as Partial<Candidato>;
    const candidatoId = request.params.id;
    await svc.editarCandidato(candidato, candidatoId);
    return reply.header('Content-Type', 'application/json').code(200).send();
  };

export const newLimparCandidatosHandler =
  (svc: RemoverCandidatoService): Handler =>
  async (_: FastifyRequest, reply: FastifyReply) => {
    await svc.limparCandidatos();
    return reply.code(204).send();
  };
