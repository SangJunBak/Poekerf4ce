import { numPhases, Phase, Player, State } from "./index";
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

export function hasPlayerPlayed(
  player: Player,
  { smallBlindAmount }: Draft<State>
) {
  return player.chipsBet >= smallBlindAmount;
}

function somePlayerHasNotFolded({ players }: Draft<State>) {
  return players.some((player) => !player.folded);
}

export function hasEveryonePlayed(state: Draft<State>) {
  return state.players.every((player) => hasPlayerPlayed(player, state));
}

export function updateCurrentPlayer(state: Draft<State>) {
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
  // TODO: If it's the river, settle the round
  //  otherwise: go to the next phase
  state.phase = offsetIndexWithinRange(state.phase!!, 1, numPhases);
}

//TODO: Create a function called "Settle Round". This function distributes the chips bet and kicks people out if they've lost.
//
