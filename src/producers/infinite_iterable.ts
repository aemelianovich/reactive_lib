/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type {
  IterableCollection,
  getIterableCollectionType,
} from '../types.js';

interface InfiniteIterable<T> {
  resolvers: Array<(value: IteratorResult<T>) => void>;
  resolve(value: T): void;
  [Symbol.asyncIterator](): AsyncIterableIterator<T>;
}

/**
 * Creates special async infinite iterable based on any iterable structure
 * Async Iterator won't be completed and new value will be generated
 * by adding new value into the iterable structure
 */
function infiniteIterable<
  T extends IterableCollection<any>,
  V extends getIterableCollectionType<T>,
>(
  collection: T,
): {
  new (...args: ConstructorParameters<T>): InstanceType<T> &
    InfiniteIterable<V>;
} {
  return class InfiniteIterableCollection
    extends collection
    implements InfiniteIterable<V>
  {
    resolvers: Array<(value: IteratorResult<V>) => void>;
    constructor(...args: any[]) {
      super(...args);
      this.resolvers = [];
    }

    resolve(value: V): void {
      if (this.resolvers != null) {
        for (const resolve of this.resolvers) {
          resolve({ done: false, value });
        }
        this.resolvers.splice(0, this.resolvers.length);
      }
    }

    [Symbol.asyncIterator](): AsyncIterableIterator<V> {
      const setResolve = (cb: (value: IteratorResult<V>) => void) => {
        this.resolvers.push(cb);
      };

      const iterator: Iterator<V> = super[Symbol.iterator]();

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
