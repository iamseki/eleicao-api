import { Cargo, ListarCargosService } from '../../domain/cargo';

export interface ConsultarCargoRepository {
  listar: () => Promise<Cargo[]>;
}

const listarCargos = async (repository: ConsultarCargoRepository) => {
  return await repository.listar();
};

export const newListarCargosDb = (repository: ConsultarCargoRepository): ListarCargosService => ({
  listarCargos: async () => listarCargos(repository)
});
