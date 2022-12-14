import { Knex } from 'knex';
import { Candidato } from '../../../domain/candidato';
import { EditarCandidatoRepository } from '../../../usecases/candidato/editar';
import { InserirCandidatoRepository } from '../../../usecases/candidato/inserir';
import { RemoverCandidatoRepository } from '../../../usecases/candidato/remover';

interface CandidatoRepository
  extends InserirCandidatoRepository,
    EditarCandidatoRepository,
    RemoverCandidatoRepository {}

const inserir = async (client: Knex, candidato: Candidato) => {
  const createdId = (await client('candidato').insert(candidato).returning('*'))[0];
  return { ...candidato, id: createdId };
};

const editar = async (client: Knex, candidato: Partial<Candidato>, id: number) => {
  await client('candidato')
    .update({ ...candidato })
    .where({ id });
};

const limpar = async (client: Knex) => {
  await client('candidato').delete();
};

export const newCandidatoRepository = (client: Knex): CandidatoRepository => ({
  inserir: async (candidato: Candidato) => inserir(client, candidato),
  editar: async (candidato: Partial<Candidato>, id: number) => editar(client, candidato, id),
  limpar: async () => limpar(client)
});
