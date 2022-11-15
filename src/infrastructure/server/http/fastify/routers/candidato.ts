import { RouteOptions } from 'fastify';

import { Handler } from '../handlers';
import { inserirPartidoSchema } from '../handlers/schemas';
import { editarCandidatoSchema, inserirCandidatoSchema } from '../handlers/schemas/candidato';

const listarCandidatos = (listarCandidatosHandler: Handler): RouteOptions => ({
  method: 'GET',
  url: '/candidato',
  schema: inserirPartidoSchema,
  handler: listarCandidatosHandler
});

const inserirCandidato = (inserirCandidatoHandler: Handler): RouteOptions => ({
  method: 'POST',
  url: '/candidato',
  schema: inserirCandidatoSchema,
  handler: inserirCandidatoHandler
});

const removerCandidato = (removerCandidatoHandler: Handler): RouteOptions => ({
  method: 'DELETE',
  url: '/candidato/:id',
  schema: inserirPartidoSchema,
  handler: removerCandidatoHandler
});

const editarCandidato = (editarCandidatoHandler: Handler): RouteOptions => ({
  method: 'PUT',
  url: '/candidato/:id',
  schema: editarCandidatoSchema,
  handler: editarCandidatoHandler
});

export { listarCandidatos, inserirCandidato, removerCandidato, editarCandidato };
