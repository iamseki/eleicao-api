import { FastifySchema } from 'fastify';

const listarCargoSchema: FastifySchema = {
  response: {
    200: { type: 'array' }
  }
};

export { listarCargoSchema };
