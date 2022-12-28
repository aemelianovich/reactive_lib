/* eslint-disable @typescript-eslint/ban-ts-comment */
import { zip, merge, mergeOrderedTuple, once } from '../aggregators/index.js';

abstract class StaticStream<T> {
  static zip = zip;
  static merge = merge;
  static mergeOrderedTuple = mergeOrderedTuple;
  static once = once;
}

export default StaticStream;
