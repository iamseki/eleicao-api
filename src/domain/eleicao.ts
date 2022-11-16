import { Candidato } from './candidato';
import { Cargo } from './cargo';

type Eleicao = {
  id?: number;
  cargo: Cargo;
  ano: number;
};

type Voto = {
  id?: number;
  eleicao_id: number;
  titulo_eleitor: number;
  candidato_codigo: number;
};

type FiltroLimparVotos = {
  ano?: number;
};

interface VotarService {
  votar: (voto: Voto) => Promise<void>;
}

interface LimparVotosService {
  limparVotos: () => Promise<void>;
}

interface CriarEleicaoService {
  criarEleicao: (eleicao: Eleicao) => Promise<Eleicao>;
}

type FiltroResultadoEleicao = {
  ano?: number;
  cargo?: Cargo;
};

type ResultadoEleicao = {
  cargo: string;
  candidatos: Partial<Candidato> & Array<{ votos: number }>;
};

interface ResultadoEleicaoService {
  resultadoEleicao: () => Promise<ResultadoEleicao[]>;
}

interface ListarEleicoesService {
  listarEleicoes: () => Promise<Eleicao[]>;
  listarCandidatoPorEleicao: (id: number) => Promise<Candidato[]>;
}

export {
  Voto,
  Eleicao,
  LimparVotosService,
  ListarEleicoesService,
  CriarEleicaoService,
  ResultadoEleicaoService,
  VotarService,
  ResultadoEleicao,
  FiltroLimparVotos,
  FiltroResultadoEleicao
};
