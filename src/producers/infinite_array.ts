/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-empty-interface */
import infiniteIterable from './infinite_iterable';

/**
 * Creates special async iterable Array based on passed Array
 * Async Iterator won't be completed and new value will be generated
 * by push method.
 *
 *
 */
class InfiniteArray<T>
  extends infiniteIterable(Array<any>)
  implements AsyncIterable<T>
{
  constructor(arr: Array<T>) {
    super(...arr);
  }

  override push(value: T): number {
    const length = super.push(value);
    // @ts-ignore
    this.resolve(value);

    return length;
  }

  [Symbol.asyncIterator]() {
    // @ts-ignore
    return super[Symbol.asyncIterator]();
  }
}

export default InfiniteArray;
