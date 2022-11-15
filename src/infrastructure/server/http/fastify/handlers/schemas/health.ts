import { FastifySchema } from 'fastify';

export const healthHandlerSchema: FastifySchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        http: { type: 'boolean' },
        mongo: { type: 'boolean' },
        redis: { type: 'boolean' }
      }
    }
  }
};
