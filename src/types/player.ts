import Card from "./card";

export type Player = {
  id: string;
  name: string;
  cards: Card[];
  money: number;
  bet: number;
};

export type HumanPlayer = Player & {};

export type CPUPlayer = Player & {};
