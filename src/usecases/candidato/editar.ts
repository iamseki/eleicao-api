import { Candidato, EditarCandidatoService } from '../../domain/candidato';

export interface EditarCandidatoRepository {
  editar: (candidato: Partial<Candidato>, id: number) => Promise<void>;
}

const editarCandidato = async (repository: EditarCandidatoRepository, candidato: Partial<Candidato>, id: number) => {
  return repository.editar(candidato, id);
};

export const newEditarCandidatoDb = (repository: EditarCandidatoRepository): EditarCandidatoService => ({
  editarCandidato: async (candidato: Partial<Candidato>, id: number) => editarCandidato(repository, candidato, id)
});
