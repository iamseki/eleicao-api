import { Knex } from 'knex';
import { ConsultarImagemRepository } from '../../../usecases/imagem/listar';

interface ImagemRepository extends ConsultarImagemRepository {}

const listar = async (client: Knex) => {
  return client.select('*').from('imagem');
};

export const newImagemRepository = (client: Knex): ImagemRepository => ({
  listar: async () => listar(client)
});
