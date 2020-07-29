import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player, CreatePlayerPayload } from "./index";
import cuid from "cuid";

export type DeletePlayerPayload = string;

type State = {
  [key: string]: Player;
};

const initialState: State = {};

export default createSlice({
  name: "players",
  initialState,
  reducers: {
    createPlayer: {
      prepare({ name, totalChips }: CreatePlayerPayload) {
        const id = cuid();
        return {
          payload: {
            id,
            name,
            totalChips,
          },
        };
      },
      reducer(state, action: PayloadAction<CreatePlayerPayload>) {
        state.push({
          ...action.payload,
          bet: 0,
        });
      },
    },
    deletePlayer: (state, action: PayloadAction<DeletePlayerPayload>) => {
      const payloadId = action.payload;
      const targetIndex = state.findIndex(({ id }) => id === payloadId);
      if (targetIndex !== -1) {
        state.splice(targetIndex);
      }
    },
  },
});
