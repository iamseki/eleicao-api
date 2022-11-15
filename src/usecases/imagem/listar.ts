import { Imagem, ListarImagensService } from '../../domain/candidato';

export interface ConsultarImagemRepository {
  listar: () => Promise<Imagem[]>;
}

const listarImagens = async (repository: ConsultarImagemRepository) => {
  return await repository.listar();
};

export const newListarImagensDb = (repository: ConsultarImagemRepository): ListarImagensService => ({
  listarImagens: async () => listarImagens(repository)
});
