import type Stream from '../streams/stream.js';
import map from './map.js';
import take from './take.js';
import filter from './filter.js';
import enumerate from './enumerate.js';

interface Modificators<T> {
  map<R>(this: Stream<T>, ...fns: ((value: T) => R)[]): Stream<R>;
  take<T>(this: Stream<T>, max: number): Stream<T>;
  filter<T>(this: Stream<T>, fn: (value: T) => boolean): Stream<T>;
  enumerate<T>(this: Stream<T>): Stream<(number | T)[]>;
}

export { Modificators, map, take, filter, enumerate };
