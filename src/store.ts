import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import GameReducer from "./ducks/game";
import PlayerReducer from "./ducks/players";

export const store = configureStore({
  reducer: combineReducers({
    PlayerReducer,
    GameReducer,
  }),
});

export default store;
