import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import GameReducer from "./game";

export const store = configureStore({
  reducer: combineReducers({
    GameReducer,
  }),
});

export const { dispatch, getState } = store;

export default store;
