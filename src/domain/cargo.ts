type Cargo = {
  id?: number;
  nome: string;
};

interface ListarCargosService {
  listarCargos: () => Promise<Cargo[]>;
}

export { Cargo, ListarCargosService };
