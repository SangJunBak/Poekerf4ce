import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player } from "../../types/player";
import { CreatePlayerPayload, DeletePlayerPayload } from "./types";
import cuid from "cuid";

export default createSlice({
  name: "players",
  initialState: [] as Player[],
  reducers: {
    createPlayer: {
      reducer(state, action: PayloadAction<CreatePlayerPayload>) {
        state.push({
          ...action.payload,
          bet: 0,
        });
      },
      prepare({
        id = cuid(),
        money = 0,
        cards = [],
        name = "",
      }: CreatePlayerPayload) {
        return {
          payload: {
            id,
            money,
            cards,
            name,
          },
        };
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
