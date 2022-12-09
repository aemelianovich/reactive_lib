import Stream from './streams/stream';
import { map, take, filter, enumerate } from './modificators';
import {
  Value,
  InfiniteArray,
  InfiniteMap,
  InfiniteSet,
  InfiniteEvents,
  RandomValue,
} from './producers';

// Add Modificators
Object.defineProperty(Stream.prototype, 'map', { value: map });
Object.defineProperty(Stream.prototype, 'take', { value: take });
Object.defineProperty(Stream.prototype, 'filter', { value: filter });
Object.defineProperty(Stream.prototype, 'enumerate', { value: enumerate });

export default Stream;
export {
  Value,
  InfiniteArray,
  InfiniteMap,
  InfiniteSet,
  InfiniteEvents,
  RandomValue,
};
