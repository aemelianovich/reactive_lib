/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */

interface InfiniteIterable<T> {
  resolvers: Array<(value: IteratorResult<T>) => void>;
  resolve(value: T): void;
  [Symbol.asyncIterator](): AsyncIterableIterator<T>;
}

type IterableCollection<T> = {
  new (...args: any[]): { [Symbol.iterator](): Iterator<T> };
};

/**
 * Creates special async infinite iterable based on any iterable structure
 * Async Iterator won't be completed and new value will be generated
 * by adding new value into the iterable structure
 */
function infiniteIterable<T extends IterableCollection<any>>(collection: T): T {
  return class InfiniteIterableCollection
    extends collection
    implements InfiniteIterable<T>
  {
    resolvers: Array<(value: IteratorResult<T>) => void>;
    constructor(...args: any[]) {
      super(...args);
      this.resolvers = [];
    }

    resolve(value: T): void {
      if (this.resolvers != null) {
        for (const resolve of this.resolvers) {
          resolve({ done: false, value });
        }
        this.resolvers.splice(0, this.resolvers.length);
      }
    }

    [Symbol.asyncIterator](): AsyncIterableIterator<T> {
      const setResolve = (cb: (value: IteratorResult<T>) => void) => {
        this.resolvers.push(cb);
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
  };
}

export default infiniteIterable;
export { InfiniteIterable };
