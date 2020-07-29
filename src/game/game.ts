import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { generateShuffledCards, initializeStartState } from "./start";
import { printO } from "../helpers";
import { PlayerPayload, StartPayload, State } from "./index";
import {
  call,
  getCurrentPlayer,
  goToNextPhase,
  isCheck,
  isPhaseOver,
  isRiver,
  rotatePlayer,
  settleRound,
} from "./helpers";

const initialState: State = {
  cardsRevealed: [],
  cardsQueue: [],
  bigBlindAmount: 0,
  smallBlindAmount: 0,

  dealerPosition: 0,
  currentPlayerPosition: 0,
  players: [],
};

type ReducerCb<T> = (state: Draft<State>, action?: PayloadAction<T>) => void;

function withPlayerAction<T>(
  reducer: ReducerCb<T>,
  state: Draft<State>
): ReducerCb<T> {
  return (state, action) => {
    reducer(state, action);
    rotatePlayer(state);
  };
}

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
    // TODO: If it's river and this is the last person to go, settle the round
    // TODO: If the round has been settled and only one person has all the money,
    // TODO: Make a HOR for updateCurrentPlayer and whatever follows it

    raise: (state, { payload: { bet } }: PayloadAction<{ bet: number }>) => {
      // TODO: Boundary check for bet and user's money
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
        return;
      }
      goToNextPhase(state);
    },

    fold: (state) => {
      // TODO: If there's only one guy left after a fold, settle the round
      getCurrentPlayer(state).folded = true;

      rotatePlayer(state);
    },
  },
});
