import { FastifySchema } from 'fastify';

const cacheHandlerSchema: FastifySchema = {
  querystring: {
    type: 'object',
    properties: {
      fundIds: { type: 'array', items: { type: 'string' } }
    },
    required: ['fundIds']
  },
  response: {
    204: {}
  }
};

type Querystring = {
  fundIds: string[];
};

export { cacheHandlerSchema, Querystring };
