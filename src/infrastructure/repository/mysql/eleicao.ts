import { Knex } from 'knex';
import { Candidato } from '../../../domain/candidato';
import { Eleicao, ResultadoEleicao, Voto } from '../../../domain/eleicao';
import { ConsultarEleicaoRepository } from '../../../usecases/eleicao/consultar';
import { InserirEleicaoRepository } from '../../../usecases/eleicao/inserir';
import { InserirVotoRepository, LimparVotosRepository } from '../../../usecases/eleicao/votar';
import { ResultadoEleicaoRepository } from '../../../usecases/eleicao/resultado';

interface EleicaoRepository
  extends ConsultarEleicaoRepository,
    InserirEleicaoRepository,
    InserirVotoRepository,
    LimparVotosRepository,
    ResultadoEleicaoRepository {}

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

const votar = async (client: Knex, voto: Voto) => {
  const { candidato_codigo, eleicao_id, titulo_eleitor } = voto;
  await client('voto').insert({
    candidato_id: client.select('id').from('candidato').where({ codigo: candidato_codigo }),
    eleicao_id,
    eleitor_id: client.select('id').from('eleitor').where({ titulo_eleitor })
  });
};

const limparVotos = async (client: Knex) => {
  await client('voto').delete();
};

const resultadoEleicao = async (client: Knex) => {
  const [data] = await client.raw(`
  select c2.nome as cargo, c.codigo, c.nome, p.sigla as partido_sigla, count(*) as votos from voto v 
  inner join candidato c on c.id = v.candidato_id
  inner join partido p on p.id = c.partido_id 
  inner join cargo c2 on c2.id = c.cargo_id
  where v.candidato_id is not null
  group by c2.nome, c.codigo, c.nome, p.sigla  
`);

  const getCandidatosMapped = (data: any) =>
    data.map((d: any) => ({
      nome: d.nome,
      codigo: d.codigo,
      partido: { sigla: d.partido_sigla },
      votos: d.votos
    }));

  const resultadoEleicao: ResultadoEleicao[] = [
    {
      cargo: 'Presidente',
      candidatos: getCandidatosMapped(data.filter((d: any) => d.cargo === 'Presidente'))
    },
    {
      cargo: 'Senador',
      candidatos: getCandidatosMapped(data.filter((d: any) => d.cargo === 'Senador'))
    },
    {
      cargo: 'Governador',
      candidatos: getCandidatosMapped(data.filter((d: any) => d.cargo === 'Governador'))
    }
  ];

  return resultadoEleicao;
};

export const newEleicaoRepository = (client: Knex): EleicaoRepository => ({
  listar: async () => listar(client),
  inserir: async (eleicao: Eleicao) => inserir(client, eleicao),
  candidatosPorEleicao: async (id: number) => listarCandidatosPorEleicao(client, id),
  votar: async (voto: Voto) => votar(client, voto),
  limparVotos: async () => limparVotos(client),
  resultadoEleicao: async () => resultadoEleicao(client)
});
