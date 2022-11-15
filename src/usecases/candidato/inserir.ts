import { Candidato, InserirCandidatoService } from '../../domain/candidato';

export interface InserirCandidatoRepository {
  inserir: (candidato: Candidato) => Promise<Candidato>;
}

const inserirCandidato = async (repository: InserirCandidatoRepository, candidato: Candidato) => {
  return repository.inserir(candidato);
};

export const newInserirCandidatoDb = (repository: InserirCandidatoRepository): InserirCandidatoService => ({
  inserirCandidato: async (candidato: Candidato) => inserirCandidato(repository, candidato)
});
