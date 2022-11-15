import { FastifyReply, FastifyRequest } from 'fastify';
import { ListarImagensService } from '../../../../../domain/candidato';

import { Handler } from './handler';

export const newListarImagemHandler =
  (svc: ListarImagensService): Handler =>
  async (_: FastifyRequest, reply: FastifyReply) => {
    const imagens = await svc.listarImagens();
    return reply.header('Content-Type', 'application/json').code(200).send(imagens);
  };
