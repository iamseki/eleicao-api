import { ResultadoEleicao, ResultadoEleicaoService } from '../../domain/eleicao';

export interface ResultadoEleicaoRepository {
  resultadoEleicao: () => Promise<ResultadoEleicao[]>;
}

const resultadoEleicao = async (repository: ResultadoEleicaoRepository) => {
  return await repository.resultadoEleicao();
};

export const newResultadoEleicoesDb = (repository: ResultadoEleicaoRepository): ResultadoEleicaoService => ({
  resultadoEleicao: async () => resultadoEleicao(repository)
});
