/**
 * Creates special async iterable producer based on primitive value
 * Async Iterator won't be completed and new value will be generated
 * by updateValue method.
 *
 *
 */
export default class Value<T extends string | number | boolean>
  implements AsyncIterable<T>
{
  value: T;
  #resolvers: Array<(value: IteratorResult<T>) => void> = [];
  constructor(value: T) {
    this.value = value;
  }

  updateValue(fn: (value: T) => T): void {
    this.value = fn(this.value);
    if (this.#resolvers.length > 0) {
      for (const resolve of this.#resolvers) {
        resolve({ done: false, value: this.value });
      }
      this.#resolvers.splice(0, this.#resolvers.length);
    }
  }

  [Symbol.asyncIterator](): AsyncIterableIterator<T> {
    const setResolve = (cb: (value: IteratorResult<T>) => void) => {
      this.#resolvers.push(cb);
    };

    let isFirstNext = true;
    const value = this.value;

    return {
      [Symbol.asyncIterator]() {
        return this;
      },
      next() {
        return new Promise((resolve) => {
          if (isFirstNext) {
            isFirstNext = false;
            resolve({ done: false, value: value });
          } else {
            setResolve(resolve);
          }
        });
      },
    };
  }
}
