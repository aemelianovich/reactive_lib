/**
 * Creates special async iterable array based on passed array
 * Async Iterator won't be completed and new value will be generated
 * by push method.
 *
 *
 */
export default class InfiniteArray<T>
  extends Array<T>
  implements AsyncIterable<T>
{
  #resolvers: Array<(value: IteratorResult<T>) => void> = [];
  constructor(arr: Array<T>) {
    super(...arr);
  }

  override push(value: T): number {
    const length = super.push(value);
    if (this.#resolvers !== null) {
      for (const resolve of this.#resolvers) {
        resolve({ done: false, value });
      }
      this.#resolvers.splice(0, this.#resolvers.length);
    }

    return length;
  }

  [Symbol.asyncIterator](): AsyncIterableIterator<T> {
    const setResolve = (cb: (value: IteratorResult<T>) => void) => {
      this.#resolvers.push(cb);
    };

    const iterator = super[Symbol.iterator]();

    return {
      [Symbol.asyncIterator]() {
        return this;
      },
      next() {
        return new Promise((resolve) => {
          const { done, value } = iterator.next();
          if (!done) {
            resolve({ done: false, value: value });
          } else {
            setResolve(resolve);
          }
        });
      },
    };
  }
}
