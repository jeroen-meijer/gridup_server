import ngrok from 'ngrok';
import { Server } from 'http';

import * as env from './env';
import app from './expressApp';
import logger from './logger';
import { Api } from './api';

let server: Server;

const main = async () => {
  logger.debug('Starting HTTP server...');
  server = app.listen(env.PORT);
  logger.debug(`Server listening on port ${env.PORT}`);

  logger.debug('Starting Ngrok server...');
  const tunnelUrl = await ngrok.connect(env.PORT);
  logger.debug(`Ngrok server is publicly accessible at ${tunnelUrl}`);

  logger.debug('Updating config...');
  await Api.updateConfig({ deviceName: env.DEVICE_NAME, hostUrl: tunnelUrl });

  logger.debug('Subscribing to game state changes...');
  Api.onGameStateUpdated(value => logger.debug(`New game state: ${value}`));

  logger.debug('Init done.');
};

const exit = (options: Partial<{ exit: boolean; cleanup: boolean }>) => {
  if (options.cleanup) {
    logger.debug('Closing Ngrok server...');
    ngrok.disconnect();
    if (server) {
      logger.debug('Closing HTTP server...');
      server.close();
    }
  }

  if (options.exit) {
    logger.debug('Exiting...');
    process.exit();
  }
};

// Catches process.exit()
process.on('exit', () => exit({ cleanup: true }));

// Catches Ctrl+C.
process.on('SIGINT', () => exit({ exit: true }));

// Catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', () => exit({ exit: true }));
process.on('SIGUSR2', () => exit({ exit: true }));

// Catches uncaught exceptions
process.on('uncaughtException', () => exit({ exit: true }));

main();
