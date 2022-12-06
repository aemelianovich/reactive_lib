/* eslint-disable @typescript-eslint/ban-ts-comment */
import { combine } from '../aggregators';

abstract class StaticStream<T> {
  static combine = combine;
}

export default StaticStream;
