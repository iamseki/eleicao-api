import { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';

import { CacheService } from '../../application/services';
import { Handler } from './handler';
import type { Querystring } from './schemas/cache';

type Request = FastifyRequest<{ Querystring: Querystring }>;

export const newCacheHandler =
  (svc: CacheService): Handler =>
  async (request: Request, reply: FastifyReply) => {
    const { fundIds } = request.query;

    await svc.delete(fundIds.filter((id) => id !== ''));
    return reply.code(StatusCodes.NO_CONTENT).send();
  };
