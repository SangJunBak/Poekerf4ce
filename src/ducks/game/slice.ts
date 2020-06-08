import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Card } from "../../types/card";

enum Phase {
  START,
  FLOP,
  TURN,
  RIVER,
  END,
}

type State = {
  phase: Phase | null;
  cardsQueue: Card[];
};

const initialState: State = {
  phase: null,
  cardsQueue: [],
};

export default createSlice({
  name: "game",
  initialState,
  reducers: {
    start: {
      reducer(state) {
        state = {
          phase: Phase.START,
          cardsDealt: [],
        };
      },
      prepare(payload) {
        return {};
      },
    },
  },
});
