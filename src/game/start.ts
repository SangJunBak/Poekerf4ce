import {
  INITIAL_SMALL_BLIND_AMOUNT,
  INITIAL_BIG_BLIND_AMOUNT,
  INITIAL_DEALER_INDEX,
} from "../constants";
import Card, { Rank, Suit, RankList, SuitList } from "./card";
import { shuffleList } from "../helpers";
import { Draft, PayloadAction } from "@reduxjs/toolkit";
import { Player, StartPayload, State } from "./index";
import {
  calculatePositions,
  insufficientFundsError,
  withdrawPlayerChips,
} from "./helpers";

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

  if (players.some(({ totalChips }) => totalChips < bigBlindAmount)) {
    throw insufficientFundsError;
  }

  state.active = true;
  const [smallBlindAmount, bigBlindAmount] = calculateInitialBlindAmounts();
  // Blinds
  state.smallBlindAmount = smallBlindAmount;
  state.bigBlindAmount = bigBlindAmount;
  // Positions
  state.dealerPosition = INITIAL_DEALER_INDEX;
  const {
    smallBlindPosition,
    bigBlindPosition,
    startingPlayerPosition,
  } = calculatePositions(state);

  state.currentPlayerPosition = startingPlayerPosition;

  state.players = players.map((player, pos) => {
    const newPlayerState: Player = {
      ...player,
      chipsBet: 0,
      folded: false,
      cards: [cards.shift(), cards.shift()] as Card[],
    };

    if (pos === smallBlindPosition) {
      withdrawPlayerChips(state, newPlayerState, smallBlindAmount);
    } else if (pos === bigBlindPosition) {
      withdrawPlayerChips(state, newPlayerState, bigBlindAmount);
    }

    return newPlayerState;
  });

  state.cardsQueue = cards;
}
