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

import { EventEmitter } from 'node:events';

// Add Opertators
Object.defineProperty(Stream.prototype, 'map', { value: map });
Object.defineProperty(Stream.prototype, 'take', { value: take });
Object.defineProperty(Stream.prototype, 'filter', { value: filter });
Object.defineProperty(Stream.prototype, 'enumerate', { value: enumerate });
//
//
//
//
// Test Examples
//
const stream = new Stream<number>([-1, -2, -3, -4, -5, -6]);

// (async () => {
//   for await (const value of stream) {
//     console.log('Stream 1:', value);
//   }
// })();

// (async () => {
//   for await (const value of stream) {
//     console.log('Stream 2:', value);
//   }
// })();

// //
// //
// //
const takeStream = new Stream<number>([1, 2, 3, 4, 5, 6]).take(4);
// (async () => {
//   for await (const value of takeStream) {
//     console.log('Take Stream 1:', value);
//   }
// })();

// (async () => {
//   for await (const value of takeStream) {
//     console.log('Take Stream 2:', value);
//   }
// })();

//
//
//
const mapStream = new Stream<number>([1, 2, 3, 4, 5, 6]).take(3).map(
  (val) => val * 10,
  (val) => val + 13,
);

// (async () => {
//   for await (const value of mapStream) {
//     console.log('Map Stream 1:', value);
//   }
// })();

// (async () => {
//   for await (const value of mapStream) {
//     console.log('Map Stream 2:', value);
//   }
// })();

// //
// // Combine
// //
// const combineStream = Stream.combine(mapStream, stream, takeStream);

// (async () => {
//   for await (const value of combineStream) {
//     console.log('Combine Stream 1:', value);
//   }
// })();

// (async () => {
//   for await (const value of combineStream) {
//     console.log('Combine Stream 2:', value);
//   }
// })();

//
// Merge
//
const mergeStream = Stream.merge(mapStream, stream, takeStream);

(async () => {
  for await (const value of mergeStream) {
    console.log('Merge Stream 1:', value);
  }
})();

(async () => {
  for await (const value of mergeStream) {
    console.log('Merge Stream 2:', value);
  }
})();

// //
// // Primitive Values
// //
// const a = new Value<number>(1);
// const b = new Value<number>(2);

// const a_s = new Stream<number>(a);
// const b_s = new Stream<number>(b);
// const c_s = Stream.combine(a_s, b_s);
// const d_s = c_s.map(([aValue, bValue]) => aValue + bValue + 5);

// (async () => {
//   console.log('a_s', await a_s.getValue()); // 1
//   console.log('b_s', await b_s.getValue()); // 2
//   console.log('c_s', await c_s.getValue());
//   console.log('d_s', await d_s.getValue()); // 8
// })();

// (async () => {
//   for await (const value of a_s) {
//     console.log('a_s Stream :', value);
//   }
// })();

// setTimeout(() => a.updateValue((val) => val + 10), 4000);

// setTimeout(async () => {
//   console.log('a_s', await a_s.getValue()); // 11
//   console.log('d_s', await d_s.getValue()); // 18
// }, 5000);

//
// Infinite Array
//

// const infArr = new InfiniteArray([51, 52, 53, 54, 55]);

// const iArrStream = new Stream(infArr);

// (async () => {
//   for await (const value of iArrStream) {
//     console.log('iArrStream 1:', value);
//   }
// })();

// setTimeout(() => infArr.push(56), 6000);
// setTimeout(() => infArr.push(57), 8000);

// const iArrMapTakeStream = iArrStream.take(6).map((val) => val * 10);

// (async () => {
//   for await (const value of iArrMapTakeStream) {
//     console.log('iArrMapTakeStream 1:', value);
//   }
// })();

//
// Infinite Map
//

// const m = new Map([
//   ['a', 1],
//   ['b', 2],
//   ['c', 3],
// ]);
// const infMap = new InfiniteMap(m);

// console.log(infMap);

// const iMapStream = new Stream(infMap);

// (async () => {
//   for await (const value of iMapStream) {
//     console.log('iMapStream 1:', value);
//   }
// })();

// setTimeout(() => infMap.set('d', 4), 6000);
// setTimeout(() => infMap.set('e', 5), 8000);

// const imapMapTakeStream = iMapStream
//   .take(6)
//   .map(([key, val]) => [key, val * 10]);

// (async () => {
//   for await (const value of imapMapTakeStream) {
//     console.log('imapMapTakeStream 1:', value);
//   }
// })();

// Infinite Set
//

// const s = new Set([110, 120, 130]);
// const infSet = new InfiniteSet(s);

// console.log(infSet);

// const iSetStream = new Stream(infSet);

// (async () => {
//   for await (const value of iSetStream) {
//     console.log('iSetStream 1:', value);
//   }
// })();

// setTimeout(() => infSet.add(140), 6000);
// setTimeout(() => infSet.add(150), 8000);

// const isetMapTakeStream = iSetStream.take(6).map((val) => val * 10);

// (async () => {
//   for await (const value of isetMapTakeStream) {
//     console.log('isetMapTakeStream 1:', value);
//   }
// })();

//
// Infinite Events from node
//

// const myEE = new EventEmitter();

// const infEvents = new InfiniteEvents(myEE, 'click');

// console.log(infEvents);

// const iEventStream = new Stream(infEvents);

// (async () => {
//   for await (const value of iEventStream) {
//     console.log('iEventStream 1:', value.payload);
//   }
// })();

// setTimeout(() => myEE.emit('click'), 2000);
// setTimeout(() => myEE.emit('click', 'it is my click 1'), 4000);
// setTimeout(() => myEE.emit('click', 'it is my click 2'), 6000);
// setTimeout(() => myEE.emit('click', 'it is my click 3'), 8000);

// const iEventMapTakeStream = iEventStream.take(3).map(() => 'Map Map Map');

// (async () => {
//   for await (const value of iEventMapTakeStream) {
//     console.log('iEventMapTakeStream 1:', value);
//   }
// })();

//
// Infinite Events from browser
//

// const infEventsBrowser = new InfiniteEvents(document, 'click');

// console.log(infEventsBrowser);

// const iEventBrowserStream = new Stream(infEventsBrowser);

// (async () => {
//   for await (const value of iEventBrowserStream) {
//     console.log('iEventBrowserStream 1:', value.payload);
//   }
// })();

// const iEventBrowserMapTakeStream = iEventBrowserStream
//   .take(3)
//   .map(() => 'Map Browser Map Browser Map Browser');

// (async () => {
//   for await (const value of iEventBrowserMapTakeStream) {
//     console.log('iEventBrowserMapTakeStream 1:', value);
//   }
// })();

//
// Infinite Random Value
//

// const infRandomVal = new RandomValue(0, 100);

// console.log(infRandomVal);

// const iRandomStream = new Stream(infRandomVal);

// (async () => {
//   for await (const value of iRandomStream
//     .take(10)
//     .filter((val) => val > 50)
//     .enumerate()) {
//     console.log('iRandomStream 1:', value);
//   }
// })();

// const iRandomMapTakeStream = iRandomStream
//   .take(3)
//   .map((val) => val * 10)
//   .enumerate();

// (async () => {
//   for await (const value of iRandomMapTakeStream) {
//     console.log('iRandomMapTakeStream 1:', value);
//   }
// })();

// const n_s = new Stream<number>([1, 2, 3, 4]);
// const s_s = new Stream<string>(['a', 'b', 'c']);
// const comb_s = Stream.combine(n_s, s_s);
