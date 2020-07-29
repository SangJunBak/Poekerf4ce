import { Card } from "../card";

export enum PlayerState {
  // Player is still in for the phase
  ACTIVE,
  // Player folded for the phase
  FOLDED,
  // Player is out for the entire game
  INACTIVE,
}

export type CreatePlayerPayload = {
  // These can be in a separate store
  name: string;
  totalChips: number;
};

export type Player = CreatePlayerPayload & {
  // Calculated in start reducer
  id: string;
  chipsBet: number;
  cards: Card[];
  state: PlayerState;
};

export function playerFactory(): Player {
  return {
    id: "",
    name: "",
    cards: [],
    totalChips: 0,
    chipsBet: 0,
    state: PlayerState.INACTIVE,
  };
}
