import { RouteOptions } from 'fastify';

import { Handler } from '../handlers';
import { listarCargoSchema } from '../handlers/schemas/cargo';

const listarCargos = (listarCargoHandler: Handler): RouteOptions => ({
  method: 'GET',
  url: '/cargo',
  schema: listarCargoSchema,
  handler: listarCargoHandler
});

export { listarCargos };
