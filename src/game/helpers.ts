import { State } from "./index";
import { Draft } from "@reduxjs/toolkit";

export function offsetIndexWithinRange(index = 0, offset = 0, range = 0) {
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

export function getCurrentPlayer({
  players,
  currentPlayerPosition,
}: Draft<State>) {
  return players[currentPlayerPosition];
}

export function updateCurrentPlayer(state: Draft<State>) {
  // TODO: Keep rotating until the next player isn't folded. End the phase if all
  //  of them are folded or if the playerPosition equals startingPlayerPosition.

  state.currentPlayerPosition = offsetIndexWithinRange(
    state.currentPlayerPosition,
    -1,
    state.players.length
  );
}
