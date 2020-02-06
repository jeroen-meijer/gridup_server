import cors from 'cors';
import express from 'express';
import stringifyObject from 'stringify-object';

import { HttpResponse, DiceValue, HttpRequestBody, GameState } from './models';
import { Api } from './api';
import logger from './logger';

const app = express();

app.use(express.json());
app.use(cors());

// Log calls
app.use((req, _, next) => {
  logger.debug(
    `[${req.method}]: ${req.path} - params: ${stringifyObject(req.params, { singleQuotes: true, indent: ' ' })
      .replace('\n', '')
      .replace(/\s+/g, ' ')}`
  );
  return next();
});

// /setGameState
type SetGameStateParams = {};
type SetGameStateResponseBody = {};
type SetGameStateRequestBody = GameState;
app.post<SetGameStateParams, HttpResponse<SetGameStateResponseBody>, HttpRequestBody<SetGameStateRequestBody>>(
  '/setGameState',
  (req, res) => {
    Api.pushGameStateToBoard(req.body);
    res.send({ success: true, payload: req.body });
  }
);

// /rolldice
type RollDiceParams = {};
type RollDiceResponseBody = {};
type RollDiceRequestBody = {
  value?: DiceValue;
};
app.post<RollDiceParams, HttpResponse<RollDiceResponseBody>, HttpRequestBody<RollDiceRequestBody>>(
  '/rollDice',
  (req, res) => {
    Api.rollDiceOnBoard(req.body?.value);
    res.send({ success: true, payload: req.body });
  }
);

// /setTileElevated
type SetTileElevatedParams = {};
type SetTileElevatedResponseBody = {};
type SetTileElevatedRequestBody = {
  elevated?: boolean;
};
app.post<SetTileElevatedParams, HttpResponse<SetTileElevatedResponseBody>, HttpRequestBody<SetTileElevatedRequestBody>>(
  '/setTileElevated',
  (req, res) => {
    Api.setTileElevated(req.body?.elevated);
    res.send({ success: true, payload: req.body });
  }
);

export default app;
