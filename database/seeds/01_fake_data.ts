import { Knex } from 'knex';

const partidos = [
  { sigla: 'PT', descricao: 'Partido dos Trabalhadores' },
  { sigla: 'PTB', descricao: 'Partido Trabalhista Brasileiro' },
  { sigla: 'PL', descricao: 'Partido Liberal' }
];

const eleicoes = [
  { cargo_id: 1, ano: 2018 },

  { cargo_id: 2, ano: 2018 },
  { cargo_id: 3, ano: 2018 },
  { cargo_id: 1, ano: 2022 },
  { cargo_id: 2, ano: 2022 },
  { cargo_id: 3, ano: 2022 }
];

const eleitor = [
  { cargo_id: 1, ano: 2018 },
  { cargo_id: 2, ano: 2018 },
  { cargo_id: 3, ano: 2018 },
  { cargo_id: 1, ano: 2022 },
  { cargo_id: 2, ano: 2022 },
  { cargo_id: 3, ano: 2022 }
];

export async function seed(knex: Knex): Promise<any> {
  // Upsert seed entries
  await knex('partido').insert(partidos).onConflict().ignore();
  await knex('eleicao').insert(eleicoes).onConflict().ignore();
}
