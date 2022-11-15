import { Knex } from 'knex';

const cargos = [
  { id: 1, nome: 'Presidente' },
  { id: 2, nome: 'Governador' },
  { id: 3, nome: 'Senador' }
];

export async function seed(knex: Knex): Promise<any> {
  // Upsert seed entries
  await knex('cargo').insert(cargos).onConflict().ignore();
}
