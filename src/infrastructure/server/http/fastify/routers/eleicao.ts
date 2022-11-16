import { RouteOptions } from 'fastify';

import { Handler } from '../handlers';
import { inserirPartidoSchema } from '../handlers/schemas';
import {
  inserirEleicaoSchema,
  inserirVotoSchema,
  listarCandidatoPorEleicao,
  listarEleicaoSchema
} from '../handlers/schemas/eleicao';

const listarEleicoes = (listarEleicoesHandler: Handler): RouteOptions => ({
  method: 'GET',
  url: '/eleicao',
  schema: listarEleicaoSchema,
  handler: listarEleicoesHandler
});

const listarCandidatosPorEleicao = (listarCandidatosPorEleicaoHandler: Handler): RouteOptions => ({
  method: 'GET',
  url: '/eleicao/:eleicao_id/candidatos',
  schema: listarCandidatoPorEleicao,
  handler: listarCandidatosPorEleicaoHandler
});

const inserirVoto = (inserirVotoHandler: Handler): RouteOptions => ({
  method: 'POST',
  url: '/eleicao/voto',
  schema: inserirVotoSchema,
  handler: inserirVotoHandler
});

const editarVoto = (editarVotoHandler: Handler): RouteOptions => ({
  method: 'PUT',
  url: '/eleicao/:id/voto',
  schema: inserirPartidoSchema,
  handler: editarVotoHandler
});

const resultadoEleicao = (resultadoEleicaoHandler: Handler): RouteOptions => ({
  method: 'GET',
  url: '/eleicao/resultado',
  handler: resultadoEleicaoHandler
});

const inserirEleicao = (inserirEleicaoHandler: Handler): RouteOptions => ({
  method: 'POST',
  url: '/eleicao',
  schema: inserirEleicaoSchema,
  handler: inserirEleicaoHandler
});

const removerEleicao = (removerEleicaoHandler: Handler): RouteOptions => ({
  method: 'DELETE',
  url: '/eleicao/:id',
  schema: inserirPartidoSchema,
  handler: removerEleicaoHandler
});

const limparVotosEleicao = (removerVotosEleicaoHandler: Handler): RouteOptions => ({
  method: 'DELETE',
  url: '/eleicao/votos',
  handler: removerVotosEleicaoHandler
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
  inserirVoto,
  editarVoto,
  listarCandidatosPorEleicao,
  limparVotosEleicao,
  resultadoEleicao
};
