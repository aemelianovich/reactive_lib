/* eslint-disable @typescript-eslint/ban-ts-comment */
import { zip, merge, once } from '../aggregators/index.js';

abstract class StaticStream<T> {
  static zip = zip;
  static merge = merge;
  static once = once;
}

export default StaticStream;
