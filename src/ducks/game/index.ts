import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Card } from "../../types/card";
import {
  calculateInitialBlindAmounts,
  generateShuffledCards,
} from "../../helpers";
import { INITIAL_DEALER_INDEX } from "../../constants";

enum Phase {
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

enum PlayerState {
  // Player is still in for the phase
  ACTIVE,
  // Player folded for the phase
  FOLDED,
  // Player is out for the entire game
  INACTIVE,
}

type Player = {
  id: string;
  name: string;
  cards: Card[];
  totalChips: number;
  chipsBet: number;
  state: PlayerState;
};

type State = {
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

export const initialState: State = {
  phase: null,
  cardsQueue: [],
  bigBlindAmount: 0,
  smallBlindAmount: 0,

  phaseBet: 0,
  dealerIndex: 0,
  currentPlayerIndex: 0,
  players: [],
};

type StartActionPayload = {
  cards: Card[];
  players: Player[];
};

const slice = createSlice({
  name: "game",
  initialState,
  reducers: {
    start: {
      prepare(payload: StartActionPayload) {
        const { players } = payload;
        // if (players.length < 2) {
        //   throw Error("Has to be more than 2 players");
        // }
        // if (players.length >= 10) {
        //   throw Error("Has to be less than 10 players");
        // }
        // Generate and Shuffle the cards
        payload.cards = generateShuffledCards();
        // Set the cards in the players

        return { payload };
      },
      reducer(state, action: PayloadAction<StartActionPayload>) {
        const { cards, players } = action.payload;
        // Calculate big blind and small blind depending on the entry amount
        const [
          smallBlindAmount,
          bigBlindAmount,
        ] = calculateInitialBlindAmounts();

        state.phase = Phase.START;
        state.cardsQueue = cards;
        state.players = players;
        state.smallBlindAmount = smallBlindAmount;
        state.bigBlindAmount = bigBlindAmount;
        state.dealerIndex = INITIAL_DEALER_INDEX;
      },
    },
  },
});

export const { start } = slice.actions;

export default slice.reducer;
