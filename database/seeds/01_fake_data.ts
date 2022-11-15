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

const imagens = [
  { id: 1, img_link: 'https://chris-public-ec10.s3.sa-east-1.amazonaws.com/chaves.png', descricao: 'chaves' },
  { id: 2, img_link: 'https://chris-public-ec10.s3.sa-east-1.amazonaws.com/madruga.png', descricao: 'madruga' },
  { id: 3, img_link: 'https://chris-public-ec10.s3.sa-east-1.amazonaws.com/popis.png', descricao: 'popis' }
];

export async function seed(knex: Knex): Promise<any> {
  // Upsert seed entries
  await knex('partido').insert(partidos).onConflict().ignore();
  await knex('eleicao').insert(eleicoes).onConflict().ignore();
  await knex('imagem').insert(imagens).onConflict().ignore();
}
