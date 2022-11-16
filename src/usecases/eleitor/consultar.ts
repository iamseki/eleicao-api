import { ConsultarEleitorService, Eleitor } from '../../domain/eleitor';

export interface ConsultarEleitorRepository {
  consultarEleitor: (titulo_eleitor: number) => Promise<Eleitor>;
}

const consultarEleitor = async (repository: ConsultarEleitorRepository, titulo_eleitor: number) => {
  return repository.consultarEleitor(titulo_eleitor);
};

export const newConsultarEleitorDb = (repository: ConsultarEleitorRepository): ConsultarEleitorService => ({
  consultarEleitor: async (titulo_eleitor: number) => consultarEleitor(repository, titulo_eleitor)
});
