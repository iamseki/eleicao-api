import { RouteOptions } from 'fastify';

import { Handler } from '../handlers';
import { profitHandlerSchema } from '../handlers/schemas';

const listarEleicoes = (listarEleicoesHandler: Handler): RouteOptions => ({
  method: 'GET',
  url: '/eleicao',
  schema: profitHandlerSchema,
  handler: listarEleicoesHandler
});

const listarCargosEletivos = (listarCargosEletivosHandler: Handler): RouteOptions => ({
  method: 'GET',
  url: '/eleicao/cargos',
  schema: profitHandlerSchema,
  handler: listarCargosEletivosHandler
});

const inserirVoto = (inserirVotoHandler: Handler): RouteOptions => ({
  method: 'POST',
  url: '/eleicao/:id/voto',
  schema: profitHandlerSchema,
  handler: inserirVotoHandler
});

const editarVoto = (editarVotoHandler: Handler): RouteOptions => ({
  method: 'PUT',
  url: '/eleicao/:id/voto',
  schema: profitHandlerSchema,
  handler: editarVotoHandler
});

const listarResultadosEleicoes = (listarResultadosEleicoesHandler: Handler): RouteOptions => ({
  method: 'GET',
  url: '/eleicao/resultados',
  schema: profitHandlerSchema,
  handler: listarResultadosEleicoesHandler
});

const inserirEleicao = (inserirEleicaoHandler: Handler): RouteOptions => ({
  method: 'POST',
  url: '/eleicao',
  schema: profitHandlerSchema,
  handler: inserirEleicaoHandler
});

const removerEleicao = (removerEleicaoHandler: Handler): RouteOptions => ({
  method: 'DELETE',
  url: '/eleicao/:id',
  schema: profitHandlerSchema,
  handler: removerEleicaoHandler
});

const editarEleicao = (editarEleicaoHandler: Handler): RouteOptions => ({
  method: 'PUT',
  url: '/eleicao/:id',
  schema: profitHandlerSchema,
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
