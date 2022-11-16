import { Knex } from 'knex';
import { Partido } from '../../../domain/partido';
import { RemoverPartidoRepository } from '../../../usecases/partido/deletar';
import { EditarPartidoRepository } from '../../../usecases/partido/editar';
import { InserirPartidoRepository } from '../../../usecases/partido/inserir';
import { ConsultarPartidoRepository } from '../../../usecases/partido/listar';

interface PartidoRepository
  extends InserirPartidoRepository,
    EditarPartidoRepository,
    RemoverPartidoRepository,
    ConsultarPartidoRepository {}

const inserir = async (client: Knex, partido: Partido) => {
  const createdId = (await client('partido').insert(partido).returning('*'))[0];
  return { ...partido, id: createdId };
};

const editar = async (client: Knex, partido: Partial<Partido>, id: number) => {
  await client('partido')
    .update({ ...partido })
    .where({ id });
};

const remover = async (client: Knex, id: number) => {
  await client.delete().from('partido').where({ id });
};

const listar = async (client: Knex) => {
  return client.select('*').from('partido');
};

const limpar = async (client: Knex) => {
  await client.delete().from('partido');
};

export const newPartidoRepository = (client: Knex): PartidoRepository => ({
  inserir: async (partido: Partido) => inserir(client, partido),
  editar: async (partido: Partial<Partido>, id: number) => editar(client, partido, id),
  remover: async (id: number) => remover(client, id),
  listar: async () => listar(client),
  limparPartidos: async () => limpar(client)
});
