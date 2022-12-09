/* eslint-disable @typescript-eslint/no-explicit-any */
import type Stream from './streams/stream';

type getStreamType<S extends Stream<any>> = S extends Stream<infer V>
  ? V
  : unknown;

type getArrayTypes<A extends any[]> = A extends (infer V)[] ? V : unknown;

type IterableCollection<T> = {
  new (...args: any[]): any & Iterable<T>;
};

type getIterableCollectionType<I extends IterableCollection<any>> = I extends {
  [Symbol.iterator](): Iterator<infer V>;
}
  ? V
  : any;

export {
  getStreamType,
  getArrayTypes,
  IterableCollection,
  getIterableCollectionType,
};
