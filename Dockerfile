FROM node:18.5.0

RUN mkdir /app

COPY ./package* ./tsconfig.json ./knex* /app/
COPY ./src /app/src

WORKDIR /app

RUN npm ci
RUN npm run build

CMD npm run start
