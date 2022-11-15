import { Candidato, InserirCandidatoService } from '../../domain/candidato';

export interface InserirCandidatoRepository {
  inserir: (candidato: Candidato) => Promise<void>;
}

const inserirCandidato = async (repository: InserirCandidatoRepository, candidato: Candidato) => {
  await repository.inserir(candidato);
};

export const newInserirCandidatoDb = (repository: InserirCandidatoRepository): InserirCandidatoService => ({
  inserirCandidato: async (candidato: Candidato) => inserirCandidato(repository, candidato)
});
