import { slice } from "./game";
import { Card } from "./card";

export const { start } = slice.actions;
export default slice.reducer;

export enum Phase {
  // Initiated by start button, everyone has two cards
  START,
  // Initiated by a round of betting, 3 cards are revealed (use selectors for this)
  FLOP,
  // Initiated by a round of betting, 4 cards are revealed
  TURN,
  // Initiated by a round of betting, 5 cards are revealed
  RIVER,
  // When the last call is initiated, user has to press quit to exit this stage
  END,
}

export enum PlayerState {
  // Player is still in for the phase
  ACTIVE,
  // Player folded for the phase
  FOLDED,
  // Player is out for the entire game
  INACTIVE,
}

export type Player = {
  // Calculated in start reducer
  id: string;
  chipsBet: number;
  totalChips: number;
  cards: Card[];
  state: PlayerState;
};

export type PlayerPayload = Pick<Player, "id" | "totalChips">;

export type State = {
  phase: Phase | null;
  cardsQueue: Card[];
  bigBlindAmount: number;
  smallBlindAmount: number;
  // Bet put in for current phase
  phaseBet: number;

  // Small blind is to the left of the dealer. Big blind is to the left of the small blind.
  dealerIndex: number;
  currentPlayerIndex: number;
  players: Player[];
};

export type StartPayload = {
  cards: Card[];
  players: PlayerPayload[];
};
