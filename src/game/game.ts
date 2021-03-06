import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generateShuffledCards, initializeStartState } from "./start";
import { printO } from "../helpers";
import { PlayerPayload, StartPayload, State } from "./index";
import {
  call,
  everyPlayerInactive,
  getCurrentPlayer,
  goToNextPhase,
  isCheck,
  isGameOver,
  isPhaseOver,
  isRiver,
  rotatePlayer,
  settleRound,
  withdrawCurrentPlayerChips,
} from "./helpers";
import { end } from "./end";

const initialState: State = {
  cardsRevealed: [],
  cardsQueue: [],
  bigBlindAmount: 0,
  smallBlindAmount: 0,

  dealerPosition: 0,
  currentPlayerPosition: 0,
  players: [],
  active: false,
};

// TODO: Separate out more actions/reducers to incorporate animations
export const slice = createSlice({
  name: "game",
  initialState,
  reducers: {
    start: {
      prepare: (playerPayload: PlayerPayload[]) => {
        // TODO: Don't cap the number of players
        if (playerPayload.length < 2) {
          throw Error("Has to be more than 2 players");
        }
        if (playerPayload.length >= 10) {
          throw Error("Has to be less than 10 players");
        }

        return {
          payload: {
            // TODO: Allow people to buy back in or leave whenever
            players: playerPayload,
            cards: generateShuffledCards(),
          },
        };
      },
      reducer: (state, action: PayloadAction<StartPayload>) => {
        initializeStartState(state, action);
      },
    },
    // TODO:
    //  - If the player has gone all-in, they shouldn't be able to raise, call, or fold
    //  - If everyone is all-in, we should settle the round
    raise: (state, { payload: { bet } }: PayloadAction<{ bet: number }>) => {
      withdrawCurrentPlayerChips(state, bet);
      rotatePlayer(state);
    },

    call: (state) => {
      if (!isCheck(state)) {
        call(state);
      }

      if (!isPhaseOver(state)) {
        rotatePlayer(state);
        return;
      }

      if (isRiver(state)) {
        settleRound(state);
        if (isGameOver(state)) {
          end(state);
        }
        return;
      }
      goToNextPhase(state);
    },

    fold: (state) => {
      getCurrentPlayer(state).folded = true;

      if (everyPlayerInactive(state)) {
        settleRound(state);
        if (isGameOver(state)) {
          end(state);
        }
        return;
      }

      rotatePlayer(state);
    },
  },
});
