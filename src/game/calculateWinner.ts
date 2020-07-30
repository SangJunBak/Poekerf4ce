import { Draft } from "@reduxjs/toolkit";
import { Phase, Player, State } from "./index";
import { isPlayerActive } from "./helpers";
import { Card } from "./card";

/*
 * Hand rules based on https://www.briggsoft.com/docs/pmavens/PMHoldem.htm
 * */

enum Hands {
  HIGH_CARD,
  PAIR,
  TWO_PAIR,
  THREE_OF_A_KIND,
  STRAIGHT,
  FOUR_OF_A_KIND,
  STRAIGHT_FLUSH,
}

// TODO:
//  - Calculate all 'winners'
//  - Divide side-pot etc. (incorporates all-in)

export function calculateWinner(state: Draft<State>) {
  if (state.cardsRevealed.length !== Phase.RIVER) {
    throw new Error("Cards revealed isn't 5");
  }
  if (state.players.some(({ cards }) => cards.length !== 2)) {
    throw new Error("Every player doesn't have 2 cards");
  }

  const activePlayers = state.players.filter(isPlayerActive);
}
