import { Knex } from 'knex';
import { ConsultarCargoRepository } from '../../../usecases/cargo/listar';

interface CargoRepository extends ConsultarCargoRepository {}

const listar = async (client: Knex) => {
  return client.select('*').from('cargo');
};

export const newCargoRepository = (client: Knex): CargoRepository => ({
  listar: async () => listar(client)
});
