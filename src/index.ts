import Stream from './streams/stream.js';
import { map, take, filter, enumerate } from './modificators/index.js';
import {
  Value,
  InfiniteArray,
  InfiniteMap,
  InfiniteSet,
  InfiniteEvents,
  RandomValue,
} from './producers/index.js';

import { applyEventsOrder } from './helpers/index.js';

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
  applyEventsOrder,
};
