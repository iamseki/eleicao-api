import Fastify, { FastifyError, FastifyInstance, FastifyBaseLogger, FastifyRequest, RouteOptions } from 'fastify';
import oas from 'fastify-oas';

const openApiConfig = {
  routePrefix: '/docs',
  swagger: {
    info: {
      title: 'Eleição API'
    },
    consumes: ['application/json'],
    servers: [
      {
        url: '/api/eleicao',
        description: 'Cloud environments'
      },
      {
        url: '/',
        description: 'Local environment'
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

const newFastifyServer = async (routes: RouteOptions[], logger: FastifyBaseLogger): Promise<FastifyInstance> => {
  const server: FastifyInstance = Fastify({
    logger,
    ajv: {
      customOptions: {
        coerceTypes: 'array'
      }
    }
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
