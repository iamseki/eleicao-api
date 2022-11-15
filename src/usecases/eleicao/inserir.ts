import { CriarEleicaoService, Eleicao } from '../../domain/eleicao';

export interface InserirEleicaoRepository {
  inserir: (eleicao: Eleicao) => Promise<Eleicao>;
}

const inserirEleicao = async (repository: InserirEleicaoRepository, eleicao: Eleicao) => {
  return repository.inserir(eleicao);
};

export const newInserirEleicaoDb = (repository: InserirEleicaoRepository): CriarEleicaoService => ({
  criarEleicao: async (eleicao: Eleicao) => inserirEleicao(repository, eleicao)
});
