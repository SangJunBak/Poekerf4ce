import util from "util";

export function printO(obj: {}) {
  console.log(util.inspect(obj, false, null, true));
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
