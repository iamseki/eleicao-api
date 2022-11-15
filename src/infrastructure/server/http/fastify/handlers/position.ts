import { FastifyReply, FastifyRequest } from 'fastify';

import { Filter, Grouper, ResponseKind } from '../../application/dtos';
import { PositionService } from '../../application/services';
import { DatePeriod } from '../../domain/position';
import { Handler } from './handler';
import type { Querystring, UriParams } from './schemas/position';

export const newPositionHandler =
  (svc: PositionService): Handler =>
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
      maxPoints,
      includeNoPrice,
      forceCurrent,

      groupByAssetClass,
      groupByProductType
    } = request.query;

    const filter: Filter = {
      fundId,
      productType,
      assetClass,
      minDate,
      maxDate,
      securityName,
      brokerName,
      brokerSymbol,
      portfolioRelations: new Set(request.query['portfolioRelations[]'] ?? []),
      maxPoints,
      includeNoPrice,
      forceCurrent,
      excludeProductTypes: new Set()
    };
    const grouper: Grouper = {
      datePeriod: DatePeriod[datePeriod],
      assetClass: groupByAssetClass,
      productType: groupByProductType
    };

    const response = await svc.getPositions(filter, grouper);
    const payload = response.kind === ResponseKind.JSON ? response.json : response.objects;

    return reply.header('Content-Type', 'application/json').code(200).send(payload);
  };
