import cuid from "cuid";
import Card from "../types/card";
import { Player } from "../types/player";

export const CREATE_PLAYER = "CREATE_PLAYER";
export const DELETE_PLAYER = "DELETE_PLAYER";
export const UPDATE_PLAYER = "UPDATE_PLAYER";

interface ICreatePlayer {
  type: typeof CREATE_PLAYER;
  payload: {
    id: string;
    initialMoney: number;
    initialCards: Card[];
    name: string;
  };
}

interface IDeletePlayer {
  type: typeof DELETE_PLAYER;
  payload: {
    id: string;
  };
}

export type PlayersActionTypes = ICreatePlayer | IDeletePlayer;

export function createPlayer(
  id = cuid() as string,
  initialMoney = 0,
  initialCards: Card[] = [],
  name = ""
): ICreatePlayer {
  return {
    type: CREATE_PLAYER,
    payload: { id, initialMoney, initialCards, name },
  };
}

export function deletePlayer(id: string): IDeletePlayer {
  return {
    type: DELETE_PLAYER,
    payload: { id },
  };
}
