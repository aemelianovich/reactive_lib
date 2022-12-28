/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-empty-interface */
import type { getMapKey, getMapValue } from '../types.js';
import infiniteIterable from './infinite_iterable.js';

/**
 * Creates special async iterable Map based on passed Map
 * Async Iterator won't be completed and new value will be generated
 * by set method.
 *
 *
 */
class InfiniteMap<
    T extends Map<any, any>,
    K extends getMapKey<T>,
    V extends getMapValue<T>,
  >
  extends infiniteIterable(Map)
  implements AsyncIterable<[K, V]>
{
  constructor(map: Map<K, V>) {
    super(map);
  }

  override set(key: K, value: V): this {
    super.set(key, value);
    this.resolve([key, value]);

    return this;
  }

  [Symbol.asyncIterator](): AsyncIterableIterator<[K, V]> {
    return super[Symbol.asyncIterator]();
  }

  [Symbol.iterator](): IterableIterator<[K, V]> {
    return <IterableIterator<[K, V]>>super[Symbol.iterator]();
  }
}

export default InfiniteMap;
