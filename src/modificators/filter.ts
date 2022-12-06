/* eslint-disable @typescript-eslint/no-this-alias */
import Stream from '../streams/stream';

/**
 * Check each event from the input Stream through a cb(callback) function,
 * to get a Stream that emits events that passed a check.
 *
 * Marble diagram:
 *
 * ```text
 * --10--30--20--5--70------
 *    filter(i => i > 30)
 * -----30----------70-----
 * ```
 */
function filter<T>(this: Stream<T>, fn: (value: T) => boolean): Stream<T> {
  const stream = this;
  const iterable = {
    async *[Symbol.asyncIterator]() {
      for await (const value of stream) {
        if (fn(value)) {
          yield value;
        }
      }
    },
  };

  return new Stream(iterable);
}

export default filter;
