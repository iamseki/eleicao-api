import { FastifySchema } from 'fastify';

const inserirCandidatoSchema: FastifySchema = {
  body: {
    type: 'object',
    required: ['codigo', 'partido_id', 'cargo_id'],
    properties: {
      codigo: { type: 'number' },
      partido_id: { type: 'number' },
      cargo_id: { type: 'number' },
      imagem_id: { type: 'number' },
      nome: { type: 'string' }
    }
  }
};

const editarCandidatoSchema: FastifySchema = {
  params: {
    id: { type: 'number' }
  },
  body: {
    type: 'object',
    properties: {
      codigo: { type: 'number' },
      partido_id: { type: 'number' },
      cargo_id: { type: 'number' },
      imagem_id: { type: 'number' },
      nome: { type: 'string' }
    }
  }
};

type UriParams = { id: number };

export { inserirCandidatoSchema, editarCandidatoSchema, UriParams };
