import { Voto, VotarService, LimparVotosService } from '../../domain/eleicao';
import { ConsultarEleitorRepository } from '../eleitor/consultar';
import { InserirEleitorRepository } from '../eleitor/inserir';

export interface InserirVotoRepository {
  votar: (voto: Voto) => Promise<void>;
}

const votar = async (
  repository: InserirVotoRepository,
  eleitorRepository: InserirEleitorRepository & ConsultarEleitorRepository,
  voto: Voto
) => {
  const eleitor = await eleitorRepository.consultarEleitor(voto.titulo_eleitor);
  if (!eleitor) await eleitorRepository.inserir({ titulo_eleitor: voto.titulo_eleitor });
  return repository.votar(voto);
};

export const newInserirVotoDb = (
  repository: InserirVotoRepository,
  eleitorRepository: InserirEleitorRepository & ConsultarEleitorRepository
): VotarService => ({
  votar: async (voto: Voto) => votar(repository, eleitorRepository, voto)
});

export interface LimparVotosRepository {
  limparVotos: () => Promise<void>;
}

const limparVotos = async (repository: LimparVotosRepository) => {
  await repository.limparVotos();
};

export const newLimparVotosDb = (repository: LimparVotosRepository): LimparVotosService => ({
  limparVotos: async () => limparVotos(repository)
});
