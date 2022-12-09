/* eslint-disable @typescript-eslint/ban-ts-comment */
import { zip, merge } from '../aggregators';

abstract class StaticStream<T> {
  static zip = zip;
  static merge = merge;
}

export default StaticStream;
