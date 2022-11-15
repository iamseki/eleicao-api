type Eleitor = {
  id?: number;
  tituloEleitor: number;
  nome: string;
  CPF?: string;
};

interface InserirEleitorService {
  inserirEleitor: (eleitor: Eleitor) => Promise<void>;
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

export { Eleitor, InserirEleitorService, EditarEleitorService, RemoverEleitorService, ListarEleitoresService };
