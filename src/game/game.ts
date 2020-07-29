import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generateShuffledCards, initializeStartState } from "./startHelpers";
import { printO } from "../helpers";
import { PlayerPayload, StartPayload, State } from "./index";

const initialState: State = {
  phase: null,
  cardsQueue: [],
  bigBlindAmount: 0,
  smallBlindAmount: 0,

  phaseBet: 0,
  dealerIndex: 0, // Small blind is to the left, big blind to the next left
  currentPlayerIndex: 0,
  players: [],
};

export const slice = createSlice({
  name: "game",
  initialState,
  reducers: {
    start: {
      prepare: (playerPayload: PlayerPayload[]) => {
        if (playerPayload.length < 2) {
          throw Error("Has to be more than 2 players");
        }
        if (playerPayload.length >= 10) {
          throw Error("Has to be less than 10 players");
        }

        return {
          payload: {
            players: playerPayload,
            cards: generateShuffledCards(),
          },
        };
      },
      reducer: (state, action: PayloadAction<StartPayload>) => {
        initializeStartState(state, action);
      },
    },
  },
});
