import { FastifyReply, FastifyRequest } from 'fastify';

import { Filter, Grouper, ResponseKind } from '../../application/dtos';
import { ProfitService } from '../../application/services';
import { DatePeriod } from '../../domain/position';
import { Handler } from './handler';
import type { Querystring, UriParams } from './schemas/profit';

export const newProfitHandler =
  (svc: ProfitService): Handler =>
  async (request: FastifyRequest<{ Params: UriParams; Querystring: Querystring }>, reply: FastifyReply) => {
    const { fundId } = request.params;
    const {
      datePeriod,
      productType,
      assetClass,
      minDate,
      maxDate,
      securityName,
      brokerName,
      brokerSymbol,
      groupBySecurity,
      groupByBrokerName,
      groupByBrokerSymbol,
      groupByAssetClass,
      groupByProductType,
      maxPoints
    } = request.query;

    const filter: Filter = {
      fundId,
      portfolioRelations: new Set(request.query['portfolioRelations[]'] ?? []),
      productType,
      assetClass,
      minDate,
      maxDate,
      securityName,
      brokerName,
      brokerSymbol,
      maxPoints,
      excludeProductTypes: new Set(request.query['excludeProductTypes[]'] ?? [])
    };
    const grouper: Grouper = {
      datePeriod: DatePeriod[datePeriod],
      assetClass: groupByAssetClass,
      brokerSymbol: groupByBrokerSymbol,
      brokerName: groupByBrokerName,
      productType: groupByProductType,
      security: groupBySecurity
    };

    const response = await svc.getProfit(filter, grouper);
    const payload = response.kind === ResponseKind.JSON ? response.json : response.objects;

    return reply.header('Content-Type', 'application/json').code(200).send(payload);
  };
