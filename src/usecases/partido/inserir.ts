import { InserirPartidoService, Partido } from '../../domain/partido';

export interface InserirPartidoRepository {
  inserir: (partido: Partido) => Promise<Partido>;
}

const inserirPartido = async (repository: InserirPartidoRepository, partido: Partido) => {
  return repository.inserir(partido);
};

export const newInserirPartidoDb = (repository: InserirPartidoRepository): InserirPartidoService => ({
  inserirPartido: async (partido: Partido) => inserirPartido(repository, partido)
});
