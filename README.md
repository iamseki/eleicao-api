# Eleição API

<p align="center">Projeto realizado com o intuito de atender aos requisitos da atividade de <strong>programação mobile</strong> da faculdade engenheiro salvador arena.</p>

## Deploy :earth_americas:

## Rodando API local com docker-compose :whale2:

- `docker-compose up -d`
- `npm run knex:migrate`
- `npm run knex:seed`

## Rodando API local sem Docker :trollface:

- `npm install`
- `npm run dev`

### Mysql 

- Instalar do site oficial ou via docker com: 
  - `docker run --name eleica-api-db -e MYSQL_DATABASE=eleicao_api -e MYSQL_USER=docker -e MYSQL_PASSWORD=docker -e MYSQL_ROOT_PASSWORD=docker -p 3306:3306 -d mysql`

