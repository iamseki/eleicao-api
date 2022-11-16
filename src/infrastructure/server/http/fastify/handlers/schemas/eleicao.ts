import { FastifySchema } from 'fastify';

const listarEleicaoSchema: FastifySchema = {
  response: {
    200: { type: 'array' }
  }
};

const inserirEleicaoSchema: FastifySchema = {
  body: {
    type: 'object',
    required: ['cargo_id', 'ano'],
    properties: {
      cargo_id: { type: 'number' },
      ano: { type: 'number' }
    }
  }
};

const listarCandidatoPorEleicao: FastifySchema = {
  params: {
    eleicao_id: { type: 'number' }
  }
};

const inserirVotoSchema: FastifySchema = {
  body: {
    type: 'object',
    required: ['titulo_eleitor', 'candidato_codigo', 'eleicao_id'],
    properties: {
      titulo_eleitor: { type: 'number' },
      candidato_codigo: { type: 'number' },
      eleicao_id: { type: 'number' }
    }
  }
};

type UriParams = { eleicao_id: number };

export { listarEleicaoSchema, inserirEleicaoSchema, listarCandidatoPorEleicao, inserirVotoSchema, UriParams };
