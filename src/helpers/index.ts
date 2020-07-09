import {
  INITIAL_SMALL_BLIND_AMOUNT,
  INITIAL_BIG_BLIND_AMOUNT,
} from "../constants";
import Card, { Suit, Rank } from "../types/card";
import { Queue } from "../data-structures/queue";

export function calculateInitialBlindAmounts(): [number, number] {
  //TODO
  return [INITIAL_SMALL_BLIND_AMOUNT, INITIAL_BIG_BLIND_AMOUNT];
}

export function generateShuffledCards() {
  const listOfCards: Queue<Card> = new Queue();
  for (let rank in Rank) {
    if (isNaN(Number(rank))) {
      for (let suit of Object.values(Suit)) {
        listOfCards.enqueue({
          suit: suit as Suit,
          rank: (Rank[rank] as unknown) as Rank,
        });
      }
    }
  }
  listOfCards.shuffle();
  return listOfCards;
}
