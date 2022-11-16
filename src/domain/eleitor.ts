type Eleitor = {
  id?: number;
  titulo_eleitor: number;
  nome?: string;
  CPF?: string;
};

interface InserirEleitorService {
  inserirEleitor: (eleitor: Eleitor) => Promise<Eleitor>;
}

interface EditarEleitorService {
  editarEleitor: (eleitor: Partial<Eleitor>) => Promise<void>;
}

interface RemoverEleitorService {
  removerEleitor: (eleitor: Partial<Eleitor>) => Promise<void>;
}

interface ListarEleitoresService {
  listarEleitor: () => Promise<Eleitor[]>;
}

interface ConsultarEleitorService {
  consultarEleitor: (titulo_eleitor: number) => Promise<Eleitor>;
}

export {
  Eleitor,
  InserirEleitorService,
  EditarEleitorService,
  RemoverEleitorService,
  ListarEleitoresService,
  ConsultarEleitorService
};
