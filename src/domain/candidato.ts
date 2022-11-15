import { Cargo } from './cargo';
import { Partido } from './partido';

type Imagem = {
  id?: number;
  imageUrl: string;
  descricao: string;
};

type Candidato = {
  id?: number;
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
  inserirCandidato: (candidato: Candidato) => Promise<void>;
}

interface EditarCandidatoService {
  inserirCandidato: (candidato: Partial<Candidato>) => Promise<void>;
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
  EditarCandidatoService
};
