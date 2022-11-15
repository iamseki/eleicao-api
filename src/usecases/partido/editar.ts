import { EditarPartidoService, Partido } from '../../domain/partido';

export interface EditarPartidoRepository {
  editar: (partido: Partial<Partido>, id: number) => Promise<void>;
}

const editarPartido = async (repository: EditarPartidoRepository, partido: Partial<Partido>, id: number) => {
  repository.editar(partido, id);
};

export const newEditarPartidoDb = (repository: EditarPartidoRepository): EditarPartidoService => ({
  editarPartido: async (partido: Partial<Partido>, id: number) => editarPartido(repository, partido, id)
});
