import { FastifySchema } from 'fastify';

const listarImagemSchema: FastifySchema = {
  response: {
    200: { type: 'array' }
  }
};

export { listarImagemSchema };
