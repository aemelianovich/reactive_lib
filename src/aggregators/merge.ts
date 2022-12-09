/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-this-alias */
import Stream from '../streams/stream';
import type { getStreamType, getArrayTypes } from '../types';

/**
 * Merge multiple input streams together to return a stream whose events
 * are values from each input stream.
 *
 
 * Marble diagram:
 *
 * ```text
 * --1----2-----3--------4---
 * ----a-----b-----c--d------
 * ------a-----b-----c--d------
 *          merge
 * --1--a--2--b--3--c--d--4---
 * ```
 */

function merge<A extends Array<Stream<any>>>(
  ...streams: A
): Stream<getArrayTypes<{ [P in keyof A]: getStreamType<A[P]> }>> {
  const iterable = {
    async *[Symbol.asyncIterator]() {
      const iterators = new Map(
        streams.map((stream, index) => [index, stream[Symbol.asyncIterator]()]),
      );

      const promises = new Map(
        [...iterators].map(([key, iter]) => {
          return [key, iter.next()];
        }),
      );

      while (true) {
        const anyIter = new Promise<[number, IteratorResult<any, void>]>(
          (resolve) => {
            for (const [key, promise] of promises) {
              promise.then(
                (res) => {
                  resolve([key, res]);
                },
                (err) => {
                  resolve([key, { done: true, value: err }]);
                },
              );
            }
          },
        );

        const [key, res] = await anyIter;

        if (res.done === true) {
          iterators.delete(key);
          promises.delete(key);
        } else {
          promises.set(key, iterators.get(key)!.next());
          yield res.value;
        }

        if (iterators.size === 0) {
          return;
        }
      }
    },
  };

  return new Stream(iterable);
}

export default merge;
