/* eslint-disable @typescript-eslint/ban-ts-comment */
import { combine, merge } from '../aggregators';

abstract class StaticStream<T> {
  static combine = combine;
  static merge = merge;
}

export default StaticStream;
