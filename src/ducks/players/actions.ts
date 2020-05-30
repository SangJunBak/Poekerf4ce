import cuid from "cuid";
import Card from "../../types/card";
import {
  CreatePlayer,
  CREATE_PLAYER,
  DeletePlayer,
  DELETE_PLAYER,
} from "./types";
import { createAction } from "@reduxjs/toolkit";

export function createPlayer(
  id = cuid() as string,
  initialMoney = 0,
  initialCards: Card[] = [],
  name = ""
): CreatePlayer {
  return {
    type: CREATE_PLAYER,
    payload: { id, initialMoney, initialCards, name },
  };
}

export function deletePlayer(id: string): DeletePlayer {
  return {
    type: DELETE_PLAYER,
    payload: { id },
  };
}
