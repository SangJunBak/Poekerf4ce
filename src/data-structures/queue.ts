import util from "util";

export class Queue<T> {
  private queue: T[];
  private length: number; // number of elements currently in the queue

  private swapElements(idx1: number, idx2: number) {
    const temp = this.queue[idx1];
    this.queue[idx1] = this.queue[idx2];
    this.queue[idx2] = temp;
  }

  public constructor() {
    this.length = 0;
    this.queue = new Array<T>();
  }

  public isEmpty(): boolean {
    return this.length === 0;
  }

  public enqueue(newItem: T): void {
    this.queue[this.length++] = newItem; // post-increment adds 1 to length after insertion
  }

  public dequeue(): T {
    if (this.isEmpty()) {
      throw new Error("Queue underflow");
    }

    const retval = this.queue[0];

    for (let i = 0; i < this.length; i++) {
      this.queue[i] = this.queue[i + 1];
    }

    this.length--; // we need to decrease length by 1
    return retval;
  }

  public peek(): T {
    if (this.isEmpty()) {
      throw new Error("Queue is empty");
    }
    return this.queue[0];
  }

  public shuffle() {
    for (let i = 0; i < this.length - 1; i++) {
      let randomIdx = Math.floor(Math.random() * this.length - i) + i;
      this.swapElements(i, randomIdx);
    }
  }

  // Console.log overrides
  [util.inspect.custom]() {
    return this.queue;
  }
}
