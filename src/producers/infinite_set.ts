/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-empty-interface */
import infiniteIterable from './infinite_iterable';

/**
 * Creates special async iterable Set based on passed Set
 * Async Iterator won't be completed and new value will be generated
 * by add method.
 *
 *
 */
class InfiniteSet<T>
  extends infiniteIterable(Set<any>)
  implements AsyncIterable<T>
{
  constructor(set: Set<T>) {
    super(set);
  }

  override add(value: T): this {
    super.add(value);
    // @ts-ignore
    this.resolve(value);

    return this;
  }

  [Symbol.asyncIterator]() {
    // @ts-ignore
    return super[Symbol.asyncIterator]();
  }
}

export default InfiniteSet;
