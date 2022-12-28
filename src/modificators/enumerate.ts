/* eslint-disable @typescript-eslint/no-this-alias */
import Stream from '../streams/stream.js';

/**
 * Transforms each event from the input Stream by adding index - [index, value],
 * to get a Stream that emits those transformed events.
 *
 * Marble diagram:
 *
 * ```text
 * --1---3--5-----7------
 *    enumerate(stream)
 * --[0,1]--[1,3]--[2,5]--[3,7]-----
 * ```
 */
function enumerate<T>(this: Stream<T>): Stream<[number, T]> {
  const stream = this;
  const iterable = {
    async *[Symbol.asyncIterator]() {
      let i = 0;
      for await (const value of stream) {
        const res: [number, T] = [i, value];
        yield res;
        i++;
      }
    },
  };

  return new Stream(iterable);
}

export default enumerate;
