import { FastifyReply, FastifyRequest } from 'fastify';
import { CriarEleicaoService, Eleicao, ListarEleicoesService } from '../../../../../domain/eleicao';
import { UriParams } from './schemas/eleicao';

import { Handler } from './handler';

export const newListarCandidatosPorEleicaoHandler =
  (svc: ListarEleicoesService): Handler =>
  async (request: FastifyRequest<{ Params: UriParams }>, reply: FastifyReply) => {
    const eleicao_id = request.params.eleicao_id;
    const candidatos = await svc.listarCandidatoPorEleicao(eleicao_id);
    return reply.header('Content-Type', 'application/json').code(200).send(candidatos);
  };

export const newListarEleicaoHandler =
  (svc: ListarEleicoesService): Handler =>
  async (_: FastifyRequest, reply: FastifyReply) => {
    const eleicoes = await svc.listarEleicoes();
    return reply.header('Content-Type', 'application/json').code(200).send(eleicoes);
  };

export const newInserirEleicaoHandler =
  (svc: CriarEleicaoService): Handler =>
  async (request: FastifyRequest, reply: FastifyReply) => {
    const eleicao = request.body as Eleicao;
    const createdEleicao = await svc.criarEleicao(eleicao);
    return reply.header('Content-Type', 'application/json').code(200).send(createdEleicao);
  };
