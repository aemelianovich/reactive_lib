/* eslint-disable @typescript-eslint/no-this-alias */
import Stream from '../streams/stream.js';

/**
 * Transforms each event from the input Stream through a cb(callback) function,
 * to get a Stream that emits those transformed events.
 *
 * Marble diagram:
 *
 * ```text
 * --1---3--5-----7------
 *    map(i => i * 10)
 * --10--30-50----70-----
 * ```
 */
function map<T, R>(
  this: Stream<T>,
  ...fns: ((value: T | R) => R)[]
): Stream<R> {
  const stream = this;
  const iterable = {
    async *[Symbol.asyncIterator]() {
      for await (const value of stream) {
        let res;
        for (const fn of fns) {
          res = fn(res ?? value);
        }
        yield <R>res;
      }
    },
  };

  return new Stream(iterable);
}

export default map;
