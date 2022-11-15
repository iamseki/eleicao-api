import { FastifySchema } from 'fastify';

import { DateRange } from '../../../../application/dtos';
import { AssetClass, LegacyProductType, ProductType } from '../../../../domain';

const profitSchema = {
  type: 'array'
};

const profitHandlerSchema: FastifySchema = {
  params: {
    fundId: { type: 'string' }
  },
  body: {
    type: 'object',
    properties: {
      productType: { type: 'string' },
      assetClass: { type: 'string' },
      periods: {
        type: 'array',
        minLength: 1,
        items: {
          type: 'object',
          properties: {
            startDate: { type: ['string'], format: 'date' },
            endDate: { type: ['string'], format: 'date' }
          },
          required: ['startDate', 'endDate']
        }
      },
      securityName: { type: ['string', 'null'] },
      brokerName: { type: ['string', 'null'] },
      brokerSymbol: { type: ['string', 'null'] },
      groupBySecurity: { type: ['boolean', 'null'] },
      groupByBrokerName: { type: ['boolean', 'null'] },
      groupByBrokerSymbol: { type: ['boolean', 'null'] },
      groupByAssetClass: { type: ['boolean', 'null'] },
      groupByProductType: { type: ['boolean', 'null'] },
      portfolioRelations: { type: 'array', items: { type: 'string' } },
      maxPoints: { type: ['number', 'null'] },
      excludeProductTypes: { type: 'array', items: { type: 'string' } }
    },
    required: ['periods']
  },
  response: {
    200: profitSchema
  }
};

type UriParams = { fundId: string };

type Body = {
  productType?: LegacyProductType | ProductType;
  assetClass?: AssetClass;
  periods: DateRange[];
  securityName?: string;
  brokerName?: string;
  brokerSymbol?: string;
  portfolioRelations: string[];
  maxPoints?: number;
  excludeProductTypes?: string[];

  groupBySecurity?: boolean;
  groupByBrokerSymbol?: boolean;
  groupByBrokerName?: boolean;
  groupByAssetClass?: boolean;
  groupByProductType?: boolean;
};

export { Body, profitHandlerSchema, UriParams };
