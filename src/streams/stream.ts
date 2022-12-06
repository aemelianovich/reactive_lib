/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-this-alias */
import { fake } from '../decorators';
import type { Operators } from '../operators';
import StaticStream from './static_stream';

interface Stream<T> extends Operators<T> {}

// Stream is an lazy event emitter.
// Based on the stream you can create iterator and recieve a new value from the stream
@fake('map')
@fake('take')
class Stream<T> extends StaticStream<T> implements AsyncIterable<T> {
  #producer: AsyncIterable<T> | Iterable<T>;

  constructor(producer: AsyncIterable<T> | Iterable<T>) {
    super();
    this.#producer = producer;
  }

  async *[Symbol.asyncIterator]() {
    yield* this.#producer;
  }

  async getValue(): Promise<T> {
    const iter = this[Symbol.asyncIterator]();
    const res = await iter.next();
    if (res.value !== undefined) {
      return res.value;
    }

    throw new Error('Unable to get a value');
  }
}

export default Stream;
