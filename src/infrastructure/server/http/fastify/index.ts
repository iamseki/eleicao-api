import Fastify, { FastifyError, FastifyInstance, FastifyLoggerInstance, FastifyRequest, RouteOptions } from 'fastify';
import oas from 'fastify-oas';
import cors from '@fastify/cors';

const openApiConfig = {
  routePrefix: '/docs',
  swagger: {
    info: {
      title: 'Eleição API'
    },
    consumes: ['application/json'],
    servers: [
      {
        url: '/',
        description: 'Local environment'
      },
      {
        url: '/api/eleicao',
        description: 'Cloud environments'
      }
    ]
  },
  exposeRoute: true
};

const loggerSerializer = {
  req(request: FastifyRequest) {
    return {
      method: request.method,
      url: request.url,
      path: request.routerPath,
      parameters: request.params,
      headers: request.headers
    };
  }
};

const newFastifyServer = async (routes: RouteOptions[], logger: FastifyLoggerInstance): Promise<FastifyInstance> => {
  const server: FastifyInstance = Fastify({
    logger,
    ajv: {
      customOptions: {
        coerceTypes: 'array'
      }
    }
  });

  await server.register(cors, {
    // put your options here
  });

  server.setErrorHandler(async (error: FastifyError, request, reply) => {
    if (error.validation) {
      await reply.status(400).send({ error: error.message });
    } else {
      logger.error(error);
      const statusCode = error.statusCode ?? 500;
      await reply.status(statusCode).send({ error: error.message });
    }
  });

  await server.register(oas, openApiConfig);

  for (const r of routes) {
    server.route(r);
  }

  return server;
};

export { loggerSerializer, newFastifyServer };
