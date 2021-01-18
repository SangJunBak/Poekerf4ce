import { slice } from "./game";
import { Card } from "./card";

export const { start } = slice.actions;
export default slice.reducer;

export enum Phase {
  // Initiated by start button, everyone has two cards, no cards are revealed
  START = 0,
  // Initiated by a round of betting, 3 cards are revealed (use selectors for this)
  FLOP = 3,
  // Initiated by a round of betting, 4 cards are revealed
  TURN,
  // Initiated by a round of betting, 5 cards are revealed
  RIVER,
}

export const numPhases = Object.keys(Phase).length;

export type Player = {
  id: string;
  // Number of chips bet
  chipsBet: number;
  // If total chips is 0, the player is out of the game. If we want to kick the person out,
  // just edit the players list.
  totalChips: number;
  cards: Card[];
  folded: boolean;
};

export type PlayerPayload = Pick<Player, "id" | "totalChips">;

export type State = {
  cardsRevealed: Card[]; // Shared cards between players
  cardsQueue: Card[]; // Next cards to be shown
  bigBlindAmount: number; // The amount that the player who's the big blind needs to pay
  smallBlindAmount: number; // The amount that the player who's the small blind needs to pay
  dealerPosition: number;
  currentPlayerPosition: number;
  players: Player[];

  active: boolean;
};

export type StartPayload = {
  cards: Card[];
  players: PlayerPayload[];
};
