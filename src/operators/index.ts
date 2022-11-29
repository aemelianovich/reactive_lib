import type Stream from '../streams/stream';
import map from './map';
import take from './take';

interface Operators<T> {
  map<R>(this: Stream<T>, fn: (value: T) => R): Stream<R>;
  take<T>(this: Stream<T>, max: number): Stream<T>;
}

export { Operators, map, take };
