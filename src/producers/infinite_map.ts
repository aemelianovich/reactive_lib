/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-empty-interface */
import infiniteIterable from './infinite_iterable';

/**
 * Creates special async iterable Map based on passed Map
 * Async Iterator won't be completed and new value will be generated
 * by push method.
 *
 *
 */
class InfiniteMap<K, V>
  extends infiniteIterable(Map<any, any>)
  implements AsyncIterable<[K, V]>
{
  constructor(map: Map<K, V>) {
    super(map);
  }

  override set(key: K, value: V): this {
    super.set(key, value);
    // @ts-ignore
    this.resolve([key, value]);

    return this;
  }

  [Symbol.asyncIterator]() {
    // @ts-ignore
    return super[Symbol.asyncIterator]();
  }
}

export default InfiniteMap;
