/**
 * Creates special async iterable producer based on primitive random value
 * between min and max numbers
 * Async Iterator won't be completed and new value will be generated.
 *
 */
export default class RandomValue implements AsyncIterable<number> {
  min: number;
  max: number;

  constructor(min: number, max: number) {
    this.min = Math.ceil(min);
    this.max = Math.floor(max);
  }

  #genRandomInt(): number {
    return Math.floor(Math.random() * (this.max - this.min) + this.min);
  }

  [Symbol.asyncIterator](): AsyncIterableIterator<number> {
    const genRandomInt: () => number = () => {
      return this.#genRandomInt();
    };

    return {
      [Symbol.asyncIterator]() {
        return this;
      },
      next() {
        return new Promise((resolve) => {
          const value = genRandomInt();
          resolve({ done: false, value: value });
        });
      },
    };
  }
}
