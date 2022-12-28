/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-empty-interface */
import infiniteIterable from './infinite_iterable.js';

/**
 * Creates special async iterable Set based on passed Set
 * Async Iterator won't be completed and new value will be generated
 * by add method.
 *
 *
 */
class InfiniteSet<T> extends infiniteIterable(Set) implements AsyncIterable<T> {
  constructor(set: Set<T>) {
    super(set);
  }

  override add(value: T): this {
    super.add(value);
    this.resolve(value);

    return this;
  }

  [Symbol.asyncIterator](): AsyncIterableIterator<T> {
    return super[Symbol.asyncIterator]();
  }

  [Symbol.iterator](): IterableIterator<T> {
    return <IterableIterator<T>>super[Symbol.iterator]();
  }
}

export default InfiniteSet;
