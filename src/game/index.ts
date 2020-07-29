import { slice } from "./game";
import { Card } from "./card";

export const { start } = slice.actions;
export default slice.reducer;

// TODO: Deprecate entirely in favour of derived state.
enum Phase {
  // Initiated by start button, everyone has two cards, no cards are revealed
  START,
  // Initiated by a round of betting, 3 cards are revealed (use selectors for this)
  FLOP,
  // Initiated by a round of betting, 4 cards are revealed
  TURN,
  // Initiated by a round of betting, 5 cards are revealed
  RIVER,
}

export const numPhases = Object.keys(Phase).length;

export type Player = {
  // Calculated in start reducer
  id: string;
  chipsBet: number;
  // If total chips is 0, the player is out of the game. If we want to kick the person out,
  // just edit the players list.
  totalChips: number;
  cards: Card[];
  folded: boolean;
};

export type PlayerPayload = Pick<Player, "id" | "totalChips">;

export type State = {
  cardsRevealed: Card[];
  cardsQueue: Card[];
  bigBlindAmount: number;
  smallBlindAmount: number;

  dealerPosition: number;
  currentPlayerPosition: number;
  players: Player[];

  active: boolean;
};

export type StartPayload = {
  cards: Card[];
  players: PlayerPayload[];
};
