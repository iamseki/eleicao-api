import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('cargo', (table: Knex.TableBuilder) => {
    table.increments('id');
    table.string('nome').unique().notNullable();
  });

  await knex.schema.createTable('eleicao', (table: Knex.TableBuilder) => {
    table.increments('id');
    table.integer('cargo_id').unsigned().references('id').inTable('cargo').notNullable();
    table.integer('ano').notNullable();

    table.unique(['cargo_id', 'ano']);
  });

  await knex.schema.createTable('imagem', (table: Knex.TableBuilder) => {
    table.increments('id');
    table.string('img_link').unique().notNullable();
    table.string('descricao').notNullable();
  });

  await knex.schema.createTable('partido', (table: Knex.TableBuilder) => {
    table.increments('id');
    table.string('sigla').unique().notNullable();
    table.string('descricao').notNullable();
  });

  await knex.schema.createTable('eleitor', (table: Knex.TableBuilder) => {
    table.increments('id');
    table.integer('titulo_eleitor').unique().notNullable();
    table.string('nome').nullable();
    table.string('cpf').unique().nullable();
  });

  await knex.schema.createTable('candidato', (table: Knex.TableBuilder) => {
    table.increments('id');
    table.integer('cargo_id').unsigned().references('id').inTable('cargo').notNullable().onDelete('CASCADE');
    table.integer('partido_id').unsigned().references('id').inTable('partido').notNullable().onDelete('CASCADE');
    table.integer('imagem_id').unsigned().references('id').inTable('imagem').nullable();
    table.integer('codigo').unique().notNullable();
    table.string('nome').notNullable();
  });

  await knex.schema.createTable('voto', (table: Knex.TableBuilder) => {
    table.increments('id');
    table.integer('eleitor_id').unsigned().references('id').inTable('eleitor').notNullable().onDelete('CASCADE');
    table.integer('candidato_id').unsigned().references('id').inTable('candidato').nullable().onDelete('CASCADE');
    table.integer('eleicao_id').unsigned().references('id').inTable('eleicao').notNullable().onDelete('CASCADE');

    table.unique(['eleitor_id', 'candidato_id', 'eleicao_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('voto');
  await knex.schema.dropTableIfExists('candidato');
  await knex.schema.dropTableIfExists('eleitor');
  await knex.schema.dropTableIfExists('partido');
  await knex.schema.dropTableIfExists('imagem');
  await knex.schema.dropTableIfExists('eleicao');
  await knex.schema.dropTableIfExists('cargo');
}
