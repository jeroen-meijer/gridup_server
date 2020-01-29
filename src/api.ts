import { firestore } from './firebase';
import { ServerConfig, GameState, DiceValue } from './models';
import * as paths from './models/paths';
import { ValueChanged } from './utilityTypes';
import { snapshotCallback, toSnakeCase } from './utils';
import logger from './logger';

export class Api {
  static async updateConfig(config: ServerConfig) {
    const serverConfigDoc = firestore.collection(paths.env).doc(paths.serverConfig);
    return serverConfigDoc.set(toSnakeCase(config));
  }

  static onGameStateUpdated(callback: ValueChanged<GameState>) {
    return firestore
      .collection(paths.games)
      .doc(paths.currentGameState)
      .onSnapshot(snapshotCallback(callback));
  }

  static async pushGameStateToBoard(gameState: GameState) {
    logger.debug(`pushGameStateToBoard called with gameState ${gameState}. Method not implemented yet.`);
  }

  static async rollDiceOnBoard(value?: DiceValue) {
    logger.debug(`rollDiceOnBoard called with value ${value}. Method not implemented yet.`);
  }
}
