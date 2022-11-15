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

type UriParams = { eleicao_id: number };

export { listarEleicaoSchema, inserirEleicaoSchema, listarCandidatoPorEleicao, UriParams };
