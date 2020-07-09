import {
  INITIAL_SMALL_BLIND_AMOUNT,
  INITIAL_BIG_BLIND_AMOUNT,
} from "../constants";

export function calculateInitialBlindAmounts(): [number, number] {
  //TODO
  return [INITIAL_SMALL_BLIND_AMOUNT, INITIAL_BIG_BLIND_AMOUNT];
}

export function swapElements<T>(list: T[], idx1: number, idx2: number) {
  const temp = list[idx1];
  list[idx1] = list[idx2];
  list[idx2] = temp;
}

export function shuffleList<T>(list: T[]) {
  const { length } = list;
  for (let i = 0; i < length - 1; i++) {
    let randomIdx = Math.floor(Math.random() * length - i) + i;
    swapElements(list, i, randomIdx);
  }
}
