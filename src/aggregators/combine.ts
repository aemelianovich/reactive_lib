/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-this-alias */
import Stream from '../streams/stream';

/**
 * Combines multiple input streams together to return a stream whose events
 * are arrays that collect the latest events from each input stream.
 *
 * It's essentially a way of joining together
 * the events from multiple streams.
 *
 * Marble diagram:
 *
 * ```text
 * --1----2-----3--------4---
 * ----a-----b-----c--d------
 *          combine
 * ----1a-2a-2b-3b-3c-3d-4d--
 * ```
 */
function combine(...streams: Array<Stream<any>>): Stream<Array<any>> {
  const iterable = {
    async *[Symbol.asyncIterator]() {
      const iterators = streams.map((stream) => stream[Symbol.asyncIterator]());

      while (true) {
        const values = <any>[];
        let done = true;
        for (const iter of iterators) {
          const res = await iter.next();
          if (res.done === false) {
            done = res.done;
          }
          values.push(res.value);
        }

        if (done) {
          return;
        }

        yield values;
      }
    },
  };

  return new Stream(iterable);
}

export default combine;
