import { Knex } from 'knex';
import { Candidato } from '../../../domain/candidato';
import { Eleicao } from '../../../domain/eleicao';
import { ConsultarEleicaoRepository } from '../../../usecases/eleicao/consultar';
import { InserirEleicaoRepository } from '../../../usecases/eleicao/inserir';

interface EleicaoRepository extends ConsultarEleicaoRepository, InserirEleicaoRepository {}

const listar = async (client: Knex) => {
  return client.select('*').from('eleicao').where({ ano: 2022 });
};

const listarCandidatosPorEleicao = async (client: Knex, eleicao_id: number) => {
  const [data] = await client.raw(`
  select c.nome candidato, c.codigo, p.sigla partido, p.descricao partido_descricao, crg.nome cargo, i.img_link from candidato c
  inner join eleicao e on e.cargo_id = c.cargo_id
  inner join partido p on p.id = c.partido_id
  inner join cargo crg on crg.id = c.cargo_id 
  left join imagem i on i.id = c.imagem_id 
  where e.id = ${eleicao_id}`);

  const candidatosMapped: Candidato[] = data.map((d: any) => ({
    nome: d.candidato,
    codigo: d.codigo,
    partido: {
      nome: d.partido,
      descricao: d.partido_descricao
    },
    cargo: {
      nome: d.cargo
    },
    imagem: {
      img_link: d.img_link
    }
  }));

  return candidatosMapped;
};

const inserir = async (client: Knex, eleicao: Eleicao) => {
  const createdId = (await client('eleicao').insert(eleicao).returning('*'))[0];
  return { ...eleicao, id: createdId };
};

export const newEleicaoRepository = (client: Knex): EleicaoRepository => ({
  listar: async () => listar(client),
  inserir: async (eleicao: Eleicao) => inserir(client, eleicao),
  candidatosPorEleicao: async (id: number) => listarCandidatosPorEleicao(client, id)
});
