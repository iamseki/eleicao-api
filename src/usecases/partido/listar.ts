import { ListarPartidosService, Partido } from '../../domain/partido';

export interface ConsultarPartidoRepository {
  listar: () => Promise<Partido[]>;
}

const listarPartidos = async (repository: ConsultarPartidoRepository) => {
  return await repository.listar();
};

export const newListarPartidosDb = (repository: ConsultarPartidoRepository): ListarPartidosService => ({
  listarPartidos: async () => listarPartidos(repository)
});
