import './utils/env.ts';

import { createApp } from './app.ts';
import { setupGracefulShutdown } from './utils/shutdown.ts';

const app = createApp({
  disableRequestLogging: false,
  ignoreTrailingSlash: true,
  // Wait 500ms after last response before destroying socket
  keepAliveTimeout: 500,
  exposeHeadRoutes: false,
});

// setup graceful shutdown
setupGracefulShutdown([app]);

try {
  await app.ready();
  await app.listen({ host: '0.0.0.0', port: 3000 });
} catch (err) {
  console.error(err);
  process.exit(1);
}
