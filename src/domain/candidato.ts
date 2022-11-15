import { Cargo } from './cargo';
import { Partido } from './partido';

type Imagem = {
  id?: number;
  img_link: string;
  descricao: string;
};

interface ListarImagensService {
  listarImagens: () => Promise<Imagem[]>;
}

type Candidato = {
  id?: number;
  nome: string;
  codigo: number;
  partido: Partido;
  cargo: Cargo;
  imagem?: Imagem;
};

type Filtro = { anoEleicao?: number } & Partial<Candidato>;

interface ListarCandidatosService {
  listarCandidatos: (filtro: Filtro) => Promise<Candidato[]>;
}

interface InserirCandidatoService {
  inserirCandidato: (candidato: Candidato) => Promise<Candidato>;
}

interface EditarCandidatoService {
  editarCandidato: (candidato: Partial<Candidato>, id: number) => Promise<void>;
}

interface RemoverCandidatoService {
  removerCandidato: (candidato: Partial<Candidato>) => Promise<void>;
}

export {
  Candidato,
  Imagem,
  ListarCandidatosService,
  InserirCandidatoService,
  RemoverCandidatoService,
  EditarCandidatoService,
  ListarImagensService
};
