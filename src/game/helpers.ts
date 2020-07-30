import { Player, State } from "./index";
import { Draft } from "@reduxjs/toolkit";
import {
  BIG_BLIND_DISTANCE_FROM_DEALER,
  NUM_CARDS_DURING_RIVER,
  SMALL_BLIND_DISTANCE_FROM_DEALER,
  STARTING_PLAYER_DISTANCE_FROM_DEALER,
} from "../constants";

export const insufficientFundsError = new Error("Insufficient funds");

export function offsetIndexWithinRange(index = 0, offset = 0, range = 1) {
  return (index + offset + range) % range;
}

export function calculatePositions(state: Draft<State>) {
  const numPlayers = state.players.length;
  return {
    smallBlindPosition: offsetIndexWithinRange(
      state.dealerPosition,
      SMALL_BLIND_DISTANCE_FROM_DEALER,
      numPlayers
    ),
    bigBlindPosition: offsetIndexWithinRange(
      state.dealerPosition,
      BIG_BLIND_DISTANCE_FROM_DEALER,
      numPlayers
    ),
    startingPlayerPosition: offsetIndexWithinRange(
      state.dealerPosition,
      STARTING_PLAYER_DISTANCE_FROM_DEALER,
      numPlayers
    ),
  };
}

function movePositionToLeft(
  state: Draft<State>,
  positionType: "dealerPosition" | "currentPlayerPosition"
) {
  state[positionType] = offsetIndexWithinRange(
    state[positionType],
    -1,
    state.players.length
  );
}

export function isRiver({ cardsRevealed }: Draft<State>) {
  return cardsRevealed.length === NUM_CARDS_DURING_RIVER;
}

export function getCurrentPlayer({
  players,
  currentPlayerPosition,
}: Draft<State>) {
  return players[currentPlayerPosition];
}

export function everyPlayerFolded({ players }: Draft<State>) {
  return players.every(({ folded }) => folded);
}

export function findMaxChipsBet({ players }: Draft<State>) {
  return players.reduce((accum, { chipsBet }) => Math.max(accum, chipsBet), 0);
}

export function isPhaseOver(state: Draft<State>) {
  const maxBet = findMaxChipsBet(state);
  return state.players.every(
    (player) => player.folded || player.chipsBet === maxBet
  );
}

export function isCheck(state: Draft<State>) {
  const currentPlayer = getCurrentPlayer(state);
  const maxBet = findMaxChipsBet(state);
  return currentPlayer.chipsBet === maxBet;
}

export function withdrawPlayerChips(
  state: Draft<State>,
  player: Player,
  amount: number
) {
  const newTotalChips = player.chipsBet - amount;
  if (newTotalChips < 0) {
    throw insufficientFundsError;
  }
  player.totalChips = newTotalChips;
  player.chipsBet += amount;
}

export function withdrawCurrentPlayerChips(
  state: Draft<State>,
  amount: number
) {
  withdrawPlayerChips(state, getCurrentPlayer(state), amount);
}

export function call(state: Draft<State>) {
  // TODO: Needs to account for the all-in case
  const maxBet = findMaxChipsBet(state);
  withdrawCurrentPlayerChips(state, maxBet);
}

export function rotatePlayer(state: Draft<State>) {
  if (everyPlayerFolded(state)) {
    throw new Error("There must be at least one player who hasn't folded");
  }

  movePositionToLeft(state, "currentPlayerPosition");
  while (getCurrentPlayer(state).folded) {
    movePositionToLeft(state, "currentPlayerPosition");
  }
}

export function goToNextPhase(state: Draft<State>) {
  movePositionToLeft(state, "dealerPosition");

  // TODO:
  //  - Shift the positions of dealer, small blind, big blind, and current user
  //  - Set chipsBet to 0 other than small blind and big blind. (We can reuse start function)
  //  - Reveal the next card
}

export function settleRound(state: Draft<State>) {
  //  TODO: We have to set each player state between each phase change:
  //   - Calculate the winner,
  //   - Distribute chipsBet across everyone
  //   - Increase smallblindAmount and bigBlindAmount
  //   - Set currentPlayerPosition back to normal
}

export function isGameOver(state: Draft<State>) {
  const numPlayersWithMoney = state.players.filter(
    ({ totalChips }) => totalChips > 0
  );
  return numPlayersWithMoney.length === 1;
}
