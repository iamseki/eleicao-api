import { FastifySchema } from 'fastify';

const netWorthHandlerSchema: FastifySchema = {
  querystring: {
    type: 'object',
    properties: {
      'fundIds[]': { type: 'array', items: { type: 'string' } },
      refDate: { type: 'string' }
    },
    required: ['refDate', 'fundIds[]']
  },
  response: {
    200: { type: 'array' }
  }
};

type Querystring = {
  'fundIds[]': string[];
  refDate: string;
};

export { netWorthHandlerSchema, Querystring };
