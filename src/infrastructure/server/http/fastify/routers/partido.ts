import { RouteOptions } from 'fastify';

import { Handler } from '../handlers';
import { profitHandlerSchema } from '../handlers/schemas';

const listarPartidos = (listarPartidosHandler: Handler): RouteOptions => ({
  method: 'GET',
  url: '/partido',
  schema: profitHandlerSchema,
  handler: listarPartidosHandler
});

const inserirPartido = (inserirPartidoHandler: Handler): RouteOptions => ({
  method: 'POST',
  url: '/partido',
  schema: profitHandlerSchema,
  handler: inserirPartidoHandler
});

const removerPartido = (removerPartidoHandler: Handler): RouteOptions => ({
  method: 'DELETE',
  url: '/partido/:id',
  schema: profitHandlerSchema,
  handler: removerPartidoHandler
});

const editarPartido = (editarPartidoHandler: Handler): RouteOptions => ({
  method: 'PUT',
  url: '/partido/:id',
  schema: profitHandlerSchema,
  handler: editarPartidoHandler
});

export { listarPartidos, inserirPartido, removerPartido, editarPartido };
