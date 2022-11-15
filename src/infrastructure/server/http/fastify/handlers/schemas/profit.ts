import { FastifySchema } from 'fastify';

import { AssetClass, LegacyProductType, ProductType } from '../../../domain';
import type { DatePeriod } from '../../../domain/position';

const profitSchema = {
  type: 'array'
};

const profitHandlerSchema: FastifySchema = {
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
      groupBySecurity: { type: ['boolean', 'null'] },
      groupByBrokerName: { type: ['boolean', 'null'] },
      groupByBrokerSymbol: { type: ['boolean', 'null'] },
      groupByAssetClass: { type: ['boolean', 'null'] },
      groupByProductType: { type: ['boolean', 'null'] },
      'portfolioRelations[]': { type: 'array', items: { type: 'string' } },
      maxPoints: { type: ['number', 'null'] },
      'excludeProductTypes[]': { type: 'array', items: { type: 'string' } }
    },
    required: ['datePeriod']
  },
  response: {
    200: profitSchema
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
  'excludeProductTypes[]'?: string[];

  groupBySecurity?: boolean;
  groupByBrokerSymbol?: boolean;
  groupByBrokerName?: boolean;
  groupByAssetClass?: boolean;
  groupByProductType?: boolean;
};

export { profitHandlerSchema, Querystring, UriParams };
