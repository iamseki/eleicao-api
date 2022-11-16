import { RemoverCandidatoService } from '../../domain/candidato';

export interface RemoverCandidatoRepository {
  limpar: () => Promise<void>;
}

const limparCandidatos = async (repository: RemoverCandidatoRepository) => {
  await repository.limpar();
};

export const newRemoverCandidatoDb = (repository: RemoverCandidatoRepository): RemoverCandidatoService => ({
  limparCandidatos: async () => limparCandidatos(repository)
});
