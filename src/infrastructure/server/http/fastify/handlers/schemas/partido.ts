import { FastifySchema } from 'fastify';

const inserirPartidoSchema: FastifySchema = {
  body: {
    type: 'object',
    required: ['sigla'],
    properties: {
      sigla: { type: 'string' },
      descricao: { type: ['string', 'null'] }
    }
  }
};

const editarPartidoSchema: FastifySchema = {
  params: {
    id: { type: 'number' }
  },
  body: {
    type: 'object',
    properties: {
      sigla: { type: ['string', 'null'] },
      descricao: { type: ['string', 'null'] }
    }
  }
};

const listarPartidoSchema: FastifySchema = {
  response: {
    200: { type: 'array' }
  }
};

const removerPartidoSchema: FastifySchema = {
  params: {
    id: { type: 'number' }
  }
};

type UriParams = { id: number };

export { inserirPartidoSchema, removerPartidoSchema, listarPartidoSchema, editarPartidoSchema, UriParams };
