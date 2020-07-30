import { State } from "./index";
import { Draft } from "@reduxjs/toolkit";

export function end(state: Draft<State>) {
  state.active = false;
}
