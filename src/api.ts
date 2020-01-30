import { firestore } from './firebase';
import { ServerConfig, GameState, DiceValue } from './models';
import * as paths from './models/paths';
import { toSnakeCase } from './utils';
import logger from './logger';

export class Api {
  static async updateConfig(config: ServerConfig) {
    const serverConfigDoc = firestore.collection(paths.env).doc(paths.serverConfig);
    return serverConfigDoc.set(toSnakeCase(config));
  }

  static async pushGameStateToBoard(gameState: GameState) {
    logger.debug(`pushGameStateToBoard called with gameState name ${gameState.name}. Method not implemented yet.`);
  }

  static async rollDiceOnBoard(value?: DiceValue) {
    logger.debug(`rollDiceOnBoard called with value ${value}. Method not implemented yet.`);
  }
}
