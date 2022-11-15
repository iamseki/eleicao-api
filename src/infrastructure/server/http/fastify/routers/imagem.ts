import { RouteOptions } from 'fastify';

import { Handler } from '../handlers';
import { listarImagemSchema } from '../handlers/schemas/imagem';

const listarImagens = (listarImagemHandler: Handler): RouteOptions => ({
  method: 'GET',
  url: '/imagem',
  schema: listarImagemSchema,
  handler: listarImagemHandler
});

export { listarImagens };
