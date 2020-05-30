import Card from "../../types/card";

export type CreatePlayerPayload = {
  id: string;
  money: number;
  cards: Card[];
  name: string;
};

export type DeletePlayerPayload = string;
