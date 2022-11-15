import { Eleitor, InserirEleitorService } from '../../domain/eleitor';

export interface InserirEleitorRepository {
  inserir: (eleitor: Eleitor) => Promise<Eleitor>;
}

const inserirEleitor = async (repository: InserirEleitorRepository, eleitor: Eleitor) => {
  return repository.inserir(eleitor);
};

export const newInserirEleitorDb = (repository: InserirEleitorRepository): InserirEleitorService => ({
  inserirEleitor: async (eleitor: Eleitor) => inserirEleitor(repository, eleitor)
});
