type Partido = {
  id?: number;
  sigla: string;
  descricao?: string;
};

interface InserirPartidoService {
  inserirPartido: (partido: Partido) => Promise<Partido>;
}

interface EditarPartidoService {
  editarPartido: (partido: Partial<Partido>, id: number) => Promise<void>;
}

interface RemoverPartidoService {
  removerPartido: (partido: Partial<Partido>) => Promise<void>;
  limparPartidos: () => Promise<void>;
}

interface ListarPartidosService {
  listarPartidos: () => Promise<Partido[]>;
}

export { Partido, InserirPartidoService, EditarPartidoService, RemoverPartidoService, ListarPartidosService };
