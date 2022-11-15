import { RouteOptions } from 'fastify';

import { Handler } from '../handlers';
import { profitHandlerSchema } from '../handlers/schemas';

const listarCandidatos = (listarCandidatosHandler: Handler): RouteOptions => ({
  method: 'GET',
  url: '/candidato',
  schema: profitHandlerSchema,
  handler: listarCandidatosHandler
});

const inserirCandidato = (inserirCandidatoHandler: Handler): RouteOptions => ({
  method: 'POST',
  url: '/candidato',
  schema: profitHandlerSchema,
  handler: inserirCandidatoHandler
});

const removerCandidato = (removerCandidatoHandler: Handler): RouteOptions => ({
  method: 'DELETE',
  url: '/candidato/:id',
  schema: profitHandlerSchema,
  handler: removerCandidatoHandler
});

const editarCandidato = (editarCandidatoHandler: Handler): RouteOptions => ({
  method: 'PUT',
  url: '/candidato/:id',
  schema: profitHandlerSchema,
  handler: editarCandidatoHandler
});

export { listarCandidatos, inserirCandidato, removerCandidato, editarCandidato };
