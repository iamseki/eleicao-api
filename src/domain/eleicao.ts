import { Candidato } from './candidato';
import { Cargo } from './cargo';
import { Eleitor } from './eleitor';

type Eleicao = {
  id?: number;
  cargo: Cargo;
  ano: number;
};

type Voto = {
  id?: number;
  candidato: Candidato;
  eleicao: Eleicao;
  eleitor: Eleitor;
};

type FiltroLimparVotos = {
  ano?: number;
};

interface LimparVotosService {
  limparVotos: (filtro: FiltroLimparVotos) => Promise<void>;
}

interface CriarEleicaoService {
  criarEleicao: (eleicao: Eleicao) => Promise<void>;
}

type FiltroResultadoEleicao = {
  ano?: number;
  cargo?: Cargo;
};

type ResultadoEleicao = {
  ano: number;
  cargo: Cargo;
  candidatos: Candidato & Array<{ votos: number }>;
};

interface ResultadoEleicaoService {
  resultadoEleicao: (filtro: FiltroResultadoEleicao) => Promise<ResultadoEleicao[]>;
}

export { Voto, Eleicao, LimparVotosService, CriarEleicaoService, ResultadoEleicaoService };
