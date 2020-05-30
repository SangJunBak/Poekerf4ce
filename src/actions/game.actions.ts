import Card from "../types/card";
import { Player } from "../types/player";

export const CREATE_PLAYER = "CREATE_PLAYER";
export const DELETE_PLAYER = "DELETE_PLAYER";
export const UPDATE_PLAYER = "UPDATE_PLAYER";

interface CreatePlayerAction {
  type: typeof CREATE_PLAYER;
  payload: {
    id: string;
    initialMoney: number;
    initialCards: Card[];
    name: string;
  };
}

interface DeletePlayerAction {
  type: typeof DELETE_PLAYER;
  payload: {
    id: string;
  };
}

interface UpdatePlayerAction {
  type: typeof UPDATE_PLAYER;
  payload: Partial<Player> & {
    id: string;
  };
}

export type PlayersActionTypes =
  | CreatePlayerAction
  | DeletePlayerAction
  | UpdatePlayerAction;
