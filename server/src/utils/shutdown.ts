type Service = { close(): Promise<void> };
type ExitState = 'initial' | 'exiting' | 'terminated';
let exitState: ExitState = 'initial';

async function gracefulShutdown(services: Service[]): Promise<void> {
  if (exitState === 'exiting' || exitState === 'terminated') {
    return;
  }
  exitState = 'exiting';
  for (const service of services) {
    await service.close();
  }
  exitState = 'terminated';

  // Properly wait for stdout to drain
  await new Promise((resolve) => {
    // Check if stdout needs draining
    if (process.stdout.writableLength === 0) {
      resolve(undefined);
      return;
    }

    // Wait for drain event
    process.stdout.once('drain', () => {
      resolve(undefined);
    });
  });
}

export function setupGracefulShutdown(services: Service[]): void {
  // exit on termination signals
  for (const signal of ['SIGHUP', 'SIGINT', 'SIGTERM', 'SIGQUIT', 'SIGBREAK']) {
    process.once(signal, () => gracefulShutdown(services));
  }

  // for (const eventName of ['unhandledRejection', 'uncaughtException']) {
  //   process.once(eventName, (reason) => {
  //     console.error(reason);
  //     setImmediate(async () => {
  //       await stop();
  //       process.exit(1);
  //     });
  //   });
  // }
}
