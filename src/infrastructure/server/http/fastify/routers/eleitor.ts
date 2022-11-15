import { RouteOptions } from 'fastify';

import { Handler } from '../handlers';
import { profitHandlerSchema } from '../handlers/schemas';

const listarEleitores = (listarEleitoresHandler: Handler): RouteOptions => ({
  method: 'GET',
  url: '/eleitor',
  schema: profitHandlerSchema,
  handler: listarEleitoresHandler
});

const inserirEleitor = (inserirEleitorHandler: Handler): RouteOptions => ({
  method: 'POST',
  url: '/eleitor',
  schema: profitHandlerSchema,
  handler: inserirEleitorHandler
});

const removerEleitor = (removerEleitorHandler: Handler): RouteOptions => ({
  method: 'DELETE',
  url: '/eleitor/:id',
  schema: profitHandlerSchema,
  handler: removerEleitorHandler
});

const editarEleitor = (editarEleitorHandler: Handler): RouteOptions => ({
  method: 'PUT',
  url: '/eleitor/:id',
  schema: profitHandlerSchema,
  handler: editarEleitorHandler
});

export { listarEleitores, inserirEleitor, removerEleitor, editarEleitor };
