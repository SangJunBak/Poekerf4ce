import { numPhases, Player, State } from "./index";
import { Draft } from "@reduxjs/toolkit";
import { NUM_CARDS_DURING_RIVER } from "../constants";

const insufficientFundsError = new Error("Insufficient funds to call");

export function offsetIndexWithinRange(index = 0, offset = 0, range = 1) {
  return (index + offset + range) % range;
}

export function getInitialPositions(
  dealerPosition: number,
  numPlayers: number
) {
  return {
    smallBlindPosition: offsetIndexWithinRange(dealerPosition, -1, numPlayers),
    bigBlindPosition: offsetIndexWithinRange(dealerPosition, -2, numPlayers),
    startingPlayerPosition: offsetIndexWithinRange(
      dealerPosition,
      -3,
      numPlayers
    ),
  };
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

function somePlayerHasNotFolded({ players }: Draft<State>) {
  return players.some((player) => !player.folded);
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

export function call(state: Draft<State>) {
  const currentPlayer = getCurrentPlayer(state);
  const maxBet = findMaxChipsBet(state);

  const newTotalChips = currentPlayer.chipsBet - maxBet;
  if (newTotalChips < 0) {
    throw insufficientFundsError;
  }
  currentPlayer.totalChips = newTotalChips;
  currentPlayer.chipsBet = maxBet;
}

export function rotatePlayer(state: Draft<State>) {
  if (!somePlayerHasNotFolded(state)) {
    throw new Error("There must be at least one player who hasn't folded");
  }

  const updateCurPlayerToLeft = () =>
    offsetIndexWithinRange(
      state.currentPlayerPosition,
      -1,
      state.players.length
    );

  updateCurPlayerToLeft();
  while (getCurrentPlayer(state).folded) {
    updateCurPlayerToLeft();
  }
}

export function goToNextPhase(state: Draft<State>) {
  // TODO:
  //  - Distribute chipsBet across everyone
  //  - Set chipsBet to 0 other than small blind and big blind. (We can reuse start function)
  //  - Reveal the next card
}

export function settleRound(state: Draft<State>) {
  //  TODO: We have to set each player state between each phase change:
  //   - Calculate the winner,
  //   - Potentially increase smallblindAmount and bigBlindAmount
  //   - Set currentPlayerPosition back to normal
}
