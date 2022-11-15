import { RouteOptions } from 'fastify';

import { Handler } from '../handlers';
import { inserirPartidoSchema } from '../handlers/schemas';

const listarEleicoes = (listarEleicoesHandler: Handler): RouteOptions => ({
  method: 'GET',
  url: '/eleicao',
  schema: inserirPartidoSchema,
  handler: listarEleicoesHandler
});

const listarCargosEletivos = (listarCargosEletivosHandler: Handler): RouteOptions => ({
  method: 'GET',
  url: '/eleicao/cargos',
  schema: inserirPartidoSchema,
  handler: listarCargosEletivosHandler
});

const inserirVoto = (inserirVotoHandler: Handler): RouteOptions => ({
  method: 'POST',
  url: '/eleicao/:id/voto',
  schema: inserirPartidoSchema,
  handler: inserirVotoHandler
});

const editarVoto = (editarVotoHandler: Handler): RouteOptions => ({
  method: 'PUT',
  url: '/eleicao/:id/voto',
  schema: inserirPartidoSchema,
  handler: editarVotoHandler
});

const listarResultadosEleicoes = (listarResultadosEleicoesHandler: Handler): RouteOptions => ({
  method: 'GET',
  url: '/eleicao/resultados',
  schema: inserirPartidoSchema,
  handler: listarResultadosEleicoesHandler
});

const inserirEleicao = (inserirEleicaoHandler: Handler): RouteOptions => ({
  method: 'POST',
  url: '/eleicao',
  schema: inserirPartidoSchema,
  handler: inserirEleicaoHandler
});

const removerEleicao = (removerEleicaoHandler: Handler): RouteOptions => ({
  method: 'DELETE',
  url: '/eleicao/:id',
  schema: inserirPartidoSchema,
  handler: removerEleicaoHandler
});

const editarEleicao = (editarEleicaoHandler: Handler): RouteOptions => ({
  method: 'PUT',
  url: '/eleicao/:id',
  schema: inserirPartidoSchema,
  handler: editarEleicaoHandler
});

export {
  listarEleicoes,
  inserirEleicao,
  removerEleicao,
  editarEleicao,
  listarResultadosEleicoes,
  inserirVoto,
  editarVoto,
  listarCargosEletivos
};
