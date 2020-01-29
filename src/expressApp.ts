import express from 'express';
import { HttpResponse, DiceValue, HttpRequestBody } from './models';
import { Api } from './api';

const app = express();

// /rolldice
type RollDiceParams = {};
type RollDiceResponseBody = {};
type RollDiceRequestBody = {
  value?: DiceValue;
};
app.post<RollDiceParams, HttpResponse<RollDiceResponseBody>, HttpRequestBody<RollDiceRequestBody>>(
  '/rolldice',
  (req, res) => {
    Api.rollDiceOnBoard(req.body?.value);
    res.send({ success: true, payload: req.body });
  }
);

export default app;
