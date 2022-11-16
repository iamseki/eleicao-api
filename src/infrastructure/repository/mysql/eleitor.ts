import { Knex } from 'knex';
import { Eleitor } from '../../../domain/eleitor';
import { ConsultarEleitorRepository } from '../../../usecases/eleitor/consultar';
import { InserirEleitorRepository } from '../../../usecases/eleitor/inserir';

interface EleitorRepository extends InserirEleitorRepository, ConsultarEleitorRepository {}

const inserir = async (client: Knex, eleitor: Eleitor) => {
  const createdId = (await client('eleitor').insert(eleitor).returning('*'))[0];
  return { ...eleitor, id: createdId };
};

const consultar = async (client: Knex, titulo_eleitor: number) => {
  return (await client.select('*').from('eleitor').where({ titulo_eleitor }))[0];
};

export const newEleitorRepository = (client: Knex): EleitorRepository => ({
  inserir: async (eleitor: Eleitor) => inserir(client, eleitor),
  consultarEleitor: async (titulo_eleitor: number) => consultar(client, titulo_eleitor)
});
