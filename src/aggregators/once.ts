/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-this-alias */
import type Stream from '../streams/stream.js';
import type { getStreamType } from '../types.js';

/**
 * Get input streams and take only the first value
 *
 *
 * Marble diagram:
 *
 * ```text
 * --1----2-----3--------4---
 *         once
 * ----1|
 * ```
 */

function once<A extends Stream<any>>(stream: A): Stream<getStreamType<A>> {
  return stream.take(1);
}

export default once;
