import {
  INITIAL_SMALL_BLIND_AMOUNT,
  INITIAL_BIG_BLIND_AMOUNT,
  INITIAL_DEALER_INDEX,
} from "../constants";
import Card, { Rank, Suit, RankList, SuitList } from "./card";
import { shuffleList } from "../helpers";
import { Draft, PayloadAction } from "@reduxjs/toolkit";
import { Phase, PlayerState, StartPayload, State } from "./index";

function calculateInitialBlindAmounts() {
  // TODO: Calculate big blind and small blind depending on the entry amount
  return [INITIAL_SMALL_BLIND_AMOUNT, INITIAL_BIG_BLIND_AMOUNT];
}

export function generateShuffledCards() {
  const listOfCards: Card[] = [];
  for (let rank of RankList) {
    for (let suit of SuitList) {
      listOfCards.push({
        rank: rank as Rank,
        suit: suit as Suit,
      });
    }
  }
  shuffleList(listOfCards);
  return listOfCards;
}

export function initializeStartState(
  state: Draft<State>,
  action: PayloadAction<StartPayload>
) {
  const { cards, players } = action.payload;

  const [smallBlindAmount, bigBlindAmount] = calculateInitialBlindAmounts();

  state.players = players.map((player) => ({
    ...player,
    chipsBet: 0,
    state: PlayerState.ACTIVE,
    cards: [cards.shift(), cards.shift()] as Card[],
  }));

  state.phase = Phase.START;
  state.cardsQueue = cards;
  state.smallBlindAmount = smallBlindAmount;
  state.bigBlindAmount = bigBlindAmount;
  state.dealerIndex = INITIAL_DEALER_INDEX;
}
