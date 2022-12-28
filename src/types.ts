/* eslint-disable @typescript-eslint/no-explicit-any */
import type Stream from './streams/stream.js';

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

type getMapKey<T extends Map<any, any>> = T extends Map<infer K, any>
  ? K
  : unknown;

type getMapValue<T extends Map<any, any>> = T extends Map<any, infer V>
  ? V
  : unknown;

export {
  getStreamType,
  getArrayTypes,
  IterableCollection,
  getIterableCollectionType,
  getMapKey,
  getMapValue,
};
