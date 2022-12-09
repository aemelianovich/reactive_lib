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

const infRandomVal = new RandomValue(0, 100);

const iRandomStream = new Stream(infRandomVal)
  .take(10)
  .filter((val) => val > 50)
  .map(
    (val) => val * 10,
    (val) => val + 13,
  )
  .enumerate();

(async () => {
  for await (const value of iRandomStream) {
    console.log('iRandomStream 1:', value);
  }
})();

(async () => {
  for await (const value of iRandomStream) {
    console.log('iRandomStream 2:', value);
  }
})();
