import { DARFService } from 'application/services/darf';
import { FastifyReply, FastifyRequest } from 'fastify';

import { DARFFilter } from '../../application/dtos';
import { Handler } from './handler';
import type { Querystring } from './schemas/darf';

export const newDarfPositionsHandler =
  (svc: DARFService): Handler =>
  async (request: FastifyRequest<{ Querystring: Querystring }>, reply: FastifyReply) => {
    const fundIds = request.query['fundIds[]'];
    const productTypes = request.query['productTypes[]'];
    const year = request.query.year;
    const filter: DARFFilter = {
      fundIds,
      productTypes,
      year
    };
    const response = await svc.getDarfPositions(filter);
    return reply.header('Content-Type', 'application/json').code(200).send(response.objects);
  };
