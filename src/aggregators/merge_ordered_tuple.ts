/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-this-alias */
import Stream from '../streams/stream.js';
import type { getStreamType } from '../types.js';

/**
 * Merge multiple input streams together to return a stream whose events
 * are arrays that collect the latest events from each input stream.
 * Triggered events will be ordered -the latest element will be in the first place
 *
 *
 * Marble diagram:
 *
 * ```text
 * --1----2-----3--------4---5-
 * ----a-----b-----c-e-d-------
 *          mergeOrderedTuple
 * -[1,undefined]--[a,1]--[2,a]---[b,2]--[3,b]-[c,3]--[e,3]--[d,3]--[4,d]--[5,d]-
 * ```
 */

function mergeOrderedTuple<
  A extends Array<Stream<any>>,
  R extends { [P in keyof A]: getStreamType<A[P]> | undefined },
>(...streams: A): Stream<R> {
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

      const values: { value: any; order: number }[] = new Array(
        streams.length,
      ).fill({
        value: undefined,
        order: 0,
      });
      let idx = 0;

      while (true) {
        idx++;
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
          values[key] = { value: res.value, order: idx };
          yield <R>[...values]
            .sort((a, b) => {
              return b.order - a.order;
            })
            .map((el) => el.value);
        }

        if (iterators.size === 0) {
          return;
        }
      }
    },
  };

  return new Stream(iterable);
}

export default mergeOrderedTuple;
