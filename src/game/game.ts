import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { generateShuffledCards, initializeStartState } from "./start";
import { printO } from "../helpers";
import { PlayerPayload, PlayerState, StartPayload, State } from "./index";
import { goToNextPhase } from "./finishTurn";
import { getCurrentPlayer, updateCurrentPlayer } from "./helpers";

const initialState: State = {
  phase: null,
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
    updateCurrentPlayer(state);
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

    raise: (state, { bet }: PayloadAction<{ bet: number }>) => {
      updateCurrentPlayer(state);
    },

    call: (state) => {
      updateCurrentPlayer(state);
    },

    // TODO: If there's only one guy left after a fold, end the round
    fold: (state) => {
      getCurrentPlayer(state).state = PlayerState.FOLDED;

      updateCurrentPlayer(state);
    },
  },
});
