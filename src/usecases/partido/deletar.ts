import { Partido, RemoverPartidoService } from '../../domain/partido';

export interface RemoverPartidoRepository {
  remover: (id: number) => Promise<void>;
}

const removerPartido = async (repository: RemoverPartidoRepository, partido: Partial<Partido>) => {
  if (partido.id) {
    await repository.remover(partido.id);
  } else {
    throw new Error('removerPartido somente suportado por ID por ora 1!!!');
  }
};

export const newDeletarPartidoDb = (repository: RemoverPartidoRepository): RemoverPartidoService => ({
  removerPartido: async (partido: Partial<Partido>) => removerPartido(repository, partido)
});
