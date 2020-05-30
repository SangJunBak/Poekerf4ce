import Card from "./card";

export enum State {
  START,
  FLOP,
  TURN,
  RIVER,
  END,
}

export type GameState = {
  state: State;
  cardsDealt: Card[];
  cardsQueue: Card[];
  playerQueue: string[];
  moneyPool: number;
};

export default GameState;
