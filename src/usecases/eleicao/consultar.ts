import { Candidato } from '../../domain/candidato';
import { Eleicao, ListarEleicoesService } from '../../domain/eleicao';

export interface ConsultarEleicaoRepository {
  listar: () => Promise<Eleicao[]>;
  candidatosPorEleicao: (id: number) => Promise<Candidato[]>;
}

const listarEleicoes = async (repository: ConsultarEleicaoRepository) => {
  return await repository.listar();
};

const listarCandidatoPorEleicao = async (repository: ConsultarEleicaoRepository, id: number) => {
  const candidatos = await repository.candidatosPorEleicao(id);
  return candidatos;
};

export const newListarEleicoesDb = (repository: ConsultarEleicaoRepository): ListarEleicoesService => ({
  listarEleicoes: async () => listarEleicoes(repository),
  listarCandidatoPorEleicao: async (id: number) => listarCandidatoPorEleicao(repository, id)
});
