import { RouteOptions } from 'fastify';

import { Handler } from '../handlers';
import { inserirPartidoSchema } from '../handlers/schemas';

const listarEleitores = (listarEleitoresHandler: Handler): RouteOptions => ({
  method: 'GET',
  url: '/eleitor',
  schema: inserirPartidoSchema,
  handler: listarEleitoresHandler
});

const inserirEleitor = (inserirEleitorHandler: Handler): RouteOptions => ({
  method: 'POST',
  url: '/eleitor',
  schema: inserirPartidoSchema,
  handler: inserirEleitorHandler
});

const removerEleitor = (removerEleitorHandler: Handler): RouteOptions => ({
  method: 'DELETE',
  url: '/eleitor/:id',
  schema: inserirPartidoSchema,
  handler: removerEleitorHandler
});

const editarEleitor = (editarEleitorHandler: Handler): RouteOptions => ({
  method: 'PUT',
  url: '/eleitor/:id',
  schema: inserirPartidoSchema,
  handler: editarEleitorHandler
});

export { listarEleitores, inserirEleitor, removerEleitor, editarEleitor };
