import { Knex } from 'knex';

const partidos = [
  { id: 1, sigla: 'PT', descricao: 'Partido dos Trabalhadores' },
  { id: 2, sigla: 'PTB', descricao: 'Partido Trabalhista Brasileiro' },
  { id: 3, sigla: 'PL', descricao: 'Partido Liberal' }
];

const eleicoes = [
  { cargo_id: 1, ano: 2018 },
  { cargo_id: 2, ano: 2018 },
  { cargo_id: 3, ano: 2018 },
  { cargo_id: 1, ano: 2022 },
  { cargo_id: 2, ano: 2022 },
  { cargo_id: 3, ano: 2022 }
];

const candidatos = [
  { cargo_id: 3, partido_id: 1, nome: 'chavinho', imagem_id: 1, codigo: 55 },
  { cargo_id: 3, partido_id: 2, nome: 'madrugão', imagem_id: 2, codigo: 13 },
  { cargo_id: 2, partido_id: 2, nome: 'dona popis', imagem_id: 3, codigo: 1317 },
  { cargo_id: 2, partido_id: 1, nome: 'rabino', imagem_id: 2, codigo: 5510 },
  { cargo_id: 1, partido_id: 2, nome: 'ze eduardo', imagem_id: 2, codigo: 17 },
  { cargo_id: 1, partido_id: 1, nome: 'padre quemedo', imagem_id: 1, codigo: 666 }
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
  await knex('candidato').insert(candidatos).onConflict().ignore();
}
