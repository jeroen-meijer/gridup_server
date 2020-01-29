import { firestore } from './firebase';
import { ServerConfig, GameState } from './models';
import * as paths from './models/paths';
import { ValueChanged } from './utilityTypes';
import { snapshotCallback, toSnakeCase } from './utils';

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
}
