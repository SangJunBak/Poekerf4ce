import { numPhases, Phase, Player, PlayerState, State } from "./index";
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

export function hasEveryonePlayed(state: Draft<State>) {
  return state.players.every((player) => hasPlayerPlayed(player, state));
}

export function goToNextPhase(state: Draft<State>) {
  state.phase = offsetIndexWithinRange(state.phase!!, 1, numPhases);
}

export function updateCurrentPlayer(state: Draft<State>) {
  // Invariant: At least one person hasn't folded

  const updateCurPlayerToLeft = () =>
    offsetIndexWithinRange(
      state.currentPlayerPosition,
      -1,
      state.players.length
    );

  const isCurrentPlayerFolded = () =>
    getCurrentPlayer(state).state === PlayerState.FOLDED;

  updateCurPlayerToLeft();
  while (isCurrentPlayerFolded() && !hasEveryonePlayed(state)) {
    updateCurPlayerToLeft();
  }
}
