import { FastifySchema } from 'fastify';

import { LegacyProductType, ProductType } from '../../../domain';

const darfDocSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      _id: {
        type: 'object',
        properties: {
          year: { type: 'number' },
          month: { type: 'number' }
        }
      },
      operations: { type: 'array' }
    }
  }
};

const darfPositionsHandlerSchema: FastifySchema = {
  querystring: {
    type: 'object',
    properties: {
      'fundIds[]': {
        type: 'array',
        items: { type: 'string' }
      },
      year: { type: 'number' },
      'productTypes[]': {
        type: 'array',
        items: { type: 'string' }
      }
    },
    required: ['fundIds[]', 'year', 'productTypes[]']
  },
  response: {
    200: darfDocSchema
  }
};

type Querystring = {
  'fundIds[]': string[];
  year: number;
  'productTypes[]': Array<LegacyProductType | ProductType>;
};

export { darfPositionsHandlerSchema, Querystring };
