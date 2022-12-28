/* eslint-disable @typescript-eslint/no-this-alias */
import Stream from '../streams/stream.js';

/**
 * Lets the first number of events from the input stream pass to the
 * output stream, then makes the output stream complete.
 *
 * Marble diagram:
 *
 * ```text
 * --a---b--c----d---e--
 *    take(3)
 * --a---b--c|
 * ```
 *
 */
function take<T>(this: Stream<T>, max: number): Stream<T> {
  const stream = this;

  const iterable = {
    async *[Symbol.asyncIterator]() {
      let num = 0;

      if (max <= 0) {
        return;
      }
      for await (const value of stream) {
        yield value;
        num++;
        if (num === max) {
          return;
        }
      }
    },
  };

  return new Stream(iterable);
}

export default take;
