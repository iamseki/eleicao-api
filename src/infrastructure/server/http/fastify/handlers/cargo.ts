import { FastifyReply, FastifyRequest } from 'fastify';
import { ListarCargosService } from '../../../../../domain/cargo';

import { Handler } from './handler';

export const newListarCargoHandler =
  (svc: ListarCargosService): Handler =>
  async (_: FastifyRequest, reply: FastifyReply) => {
    const cargos = await svc.listarCargos();
    return reply.header('Content-Type', 'application/json').code(200).send(cargos);
  };
