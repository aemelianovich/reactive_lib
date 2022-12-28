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

const m = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
]);
const infMap = new InfiniteMap(m);

const iMapStream = new Stream(infMap);

(async () => {
  for await (const value of iMapStream) {
    console.log('iMapStream 1:', value);
  }
})();

setTimeout(() => infMap.set('d', 4), 6000);
setTimeout(() => infMap.set('e', 5), 8000);

const imapMapTakeStream = iMapStream
  .take(6)
  .map(([key, val]) => [key, val * 10]);

(async () => {
  for await (const value of imapMapTakeStream) {
    console.log('imapMapTakeStream 1:', value);
  }
})();
