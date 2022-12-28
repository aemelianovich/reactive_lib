/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-empty-interface */
import infiniteIterable from './infinite_iterable.js';

/**
 * Creates special async iterable Array based on passed Array
 * Async Iterator won't be completed and new value will be generated
 * by push method.
 *
 *
 */
class InfiniteArray<T>
  // Вывести тип в итераторы
  extends infiniteIterable(Array)
  implements AsyncIterable<T>
{
  constructor(arr: Array<T>) {
    if (arr.length === 1) {
      super();
      this.push(arr[0]);
    } else {
      super(...arr);
    }
  }

  override push(value: T): number {
    const length = super.push(value);
    this.resolve(value);

    return length;
  }

  [Symbol.asyncIterator](): AsyncIterableIterator<T> {
    return <AsyncIterableIterator<T>>super[Symbol.asyncIterator]();
  }

  [Symbol.iterator](): IterableIterator<T> {
    return <IterableIterator<T>>super[Symbol.iterator]();
  }
}

export default InfiniteArray;
