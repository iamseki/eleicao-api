import { FastifySchema } from 'fastify';

import { AssetClass, LegacyProductType, ProductType } from '../../../domain';
import type { DatePeriod } from '../../../domain/position';

const positionSchema = {
  type: 'array'
};

const positionHandlerSchema: FastifySchema = {
  params: {
    fundId: { type: 'string' }
  },
  querystring: {
    type: 'object',
    properties: {
      datePeriod: {
        type: 'string',
        enum: ['DAILY', 'MONTHLY', 'YEARLY']
      },
      productType: { type: 'string' },
      assetClass: { type: 'string' },
      minDate: { type: ['string', 'null'] },
      maxDate: { type: ['string', 'null'] },
      securityName: { type: ['string', 'null'] },
      brokerName: { type: ['string', 'null'] },
      brokerSymbol: { type: ['string', 'null'] },
      groupByAssetClass: { type: ['boolean', 'null'] },
      groupByProductType: { type: ['boolean', 'null'] },
      'portfolioRelations[]': { type: 'array', items: { type: 'string' } },
      maxPoints: { type: ['number', 'null'] },
      includeNoPrice: { type: ['boolean', 'null'] },
      forceCurrent: { type: ['boolean', 'null'] }
    },
    required: ['datePeriod']
  },
  response: {
    200: positionSchema
  }
};

type UriParams = { fundId: string };
type Querystring = {
  datePeriod: DatePeriod;
  productType?: LegacyProductType | ProductType;
  assetClass?: AssetClass;
  minDate?: string;
  maxDate?: string;
  securityName?: string;
  brokerName?: string;
  brokerSymbol?: string;
  'portfolioRelations[]'?: string[];
  maxPoints?: number;
  includeNoPrice?: boolean;
  forceCurrent?: boolean;

  groupByAssetClass?: boolean;
  groupByProductType?: boolean;
};

export { positionHandlerSchema, Querystring, UriParams };
