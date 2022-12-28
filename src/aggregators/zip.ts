/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-this-alias */
import Stream from '../streams/stream.js';
import type { getStreamType } from '../types.js';

/**
 * Zip multiple input streams together to return a stream whose events
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
 *          zip
 * --[1,a]-[2,a]-[2,b]-[3,b]-[3,c]-[3,d]-[4,d]--
 * ```
 */

function zip<A extends Array<Stream<any>>>(
  ...streams: A
): Stream<{ [P in keyof A]: getStreamType<A[P]> }> {
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

export default zip;
