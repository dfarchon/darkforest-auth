import {
  fastify,
  type FastifyInstance,
  type FastifyServerOptions,
} from 'fastify';

export function createApp(options: FastifyServerOptions): FastifyInstance {
  const app = fastify({
    ...options,
  });

  return app;
}
