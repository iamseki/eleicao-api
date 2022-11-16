import { RouteOptions } from 'fastify';

import { Handler } from '../handlers';
import {
  editarPartidoSchema,
  inserirPartidoSchema,
  listarPartidoSchema,
  removerPartidoSchema
} from '../handlers/schemas';

const listarPartidos = (listarPartidosHandler: Handler): RouteOptions => ({
  method: 'GET',
  url: '/partido',
  schema: listarPartidoSchema,
  handler: listarPartidosHandler
});

const inserirPartido = (inserirPartidoHandler: Handler): RouteOptions => ({
  method: 'POST',
  url: '/partido',
  schema: inserirPartidoSchema,
  handler: inserirPartidoHandler
});

const removerPartido = (removerPartidoHandler: Handler): RouteOptions => ({
  method: 'DELETE',
  url: '/partido/:id',
  schema: removerPartidoSchema,
  handler: removerPartidoHandler
});

const limparPartidos = (limparPartidosHandler: Handler): RouteOptions => ({
  method: 'DELETE',
  url: '/partido',
  handler: limparPartidosHandler
});

const editarPartido = (editarPartidoHandler: Handler): RouteOptions => ({
  method: 'PUT',
  url: '/partido/:id',
  schema: editarPartidoSchema,
  handler: editarPartidoHandler
});

export { listarPartidos, inserirPartido, removerPartido, editarPartido, limparPartidos };
