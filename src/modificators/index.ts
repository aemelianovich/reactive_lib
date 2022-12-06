import type Stream from '../streams/stream';
import map from './map';
import take from './take';
import filter from './filter';
import enumerate from './enumerate';

interface Operators<T> {
  map<R>(this: Stream<T>, ...fns: ((value: T) => R)[]): Stream<R>;
  take<T>(this: Stream<T>, max: number): Stream<T>;
  filter<T>(this: Stream<T>, fn: (value: T) => boolean): Stream<T>;
  enumerate<T>(this: Stream<T>): Stream<(number | T)[]>;
}

export { Operators, map, take, filter, enumerate };
