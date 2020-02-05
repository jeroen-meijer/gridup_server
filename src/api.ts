import axios from 'axios';

import { firestore } from './firebase';
import { ServerConfig, GameState, DiceValue } from './models';
import * as paths from './models/paths';
import { toSnakeCase } from './utils';
import logger from './logger';

export class Api {
  private static readonly _host = 'localhost:6969';

  static async updateConfig(config: ServerConfig) {
    const serverConfigDoc = firestore.collection(paths.env).doc(paths.serverConfig);
    return serverConfigDoc.set(toSnakeCase(config));
  }

  static async pushGameStateToBoard(gameState: GameState) {
    logger.debug(`pushGameStateToBoard called with gameState name ${gameState.name}.`);
    axios.post(`${Api._host}/setGameState`, gameState);
  }

  static async rollDiceOnBoard(value?: DiceValue) {
    logger.debug(`rollDiceOnBoard called with value ${value}.`);
    axios.get(`${Api._host}/rollDice/${value ?? Math.round(Math.random() * 5 + 1)}`);
  }
}
