type Partido = {
  id?: number;
  sigla: string;
  descricao?: string;
};

interface InserirPartidoService {
  inserirEleitor: (partido: Partido) => Promise<void>;
}

interface EditarPartidoService {
  editarPartido: (partido: Partial<Partido>) => Promise<void>;
}

interface RemoverPartidoService {
  removerPartido: (partido: Partial<Partido>) => Promise<void>;
}

interface ListarPartidosService {
  listarPartidos: () => Promise<Partido[]>;
}

export { Partido, InserirPartidoService, EditarPartidoService, RemoverPartidoService, ListarPartidosService };
