import Stream from './streams/stream.js';
import { map, take } from './operators/';
import { Value, InfiniteArray } from './producers';

// Add Opertators
Object.defineProperty(Stream.prototype, 'map', { value: map });
Object.defineProperty(Stream.prototype, 'take', { value: take });
//
//
//
//
// Test Examples
//
const stream = new Stream<number>([1, 2, 3, 4, 5, 6]);

(async () => {
  for await (const value of stream) {
    console.log('Stream 1:', value);
  }
})();

(async () => {
  for await (const value of stream) {
    console.log('Stream 2:', value);
  }
})();

//
//
//
const takeStream = new Stream<number>([1, 2, 3, 4, 5, 6]).take(4);
(async () => {
  for await (const value of takeStream) {
    console.log('Take Stream 1:', value);
  }
})();

(async () => {
  for await (const value of takeStream) {
    console.log('Take Stream 2:', value);
  }
})();

//
//
//
const mapStream = new Stream<number>([1, 2, 3, 4, 5, 6])
  .take(3)
  .map((val) => val * 10);

(async () => {
  for await (const value of mapStream) {
    console.log('Map Stream 1:', value);
  }
})();

(async () => {
  for await (const value of mapStream) {
    console.log('Map Stream 2:', value);
  }
})();

//
//
//
const combineStream = Stream.combine(mapStream, stream, takeStream);

(async () => {
  for await (const value of combineStream) {
    console.log('Combine Stream 1:', value);
  }
})();

(async () => {
  for await (const value of combineStream) {
    console.log('Combine Stream 2:', value);
  }
})();

//
// Primitive Values
//
const a = new Value<number>(1);
const b = new Value<number>(2);

const a_s = new Stream<number>(a);
const b_s = new Stream<number>(b);
const c_s = Stream.combine(a_s, b_s);
const d_s = c_s.map(([aValue, bValue]) => aValue + bValue + 5);

(async () => {
  console.log('a_s', await a_s.getValue()); // 1
  console.log('b_s', await b_s.getValue()); // 2
  console.log('c_s', await c_s.getValue());
  console.log('d_s', await d_s.getValue()); // 8
})();

(async () => {
  for await (const value of a_s) {
    console.log('a_s Stream :', value);
  }
})();

setTimeout(() => a.updateValue((val) => val + 10), 4000);

setTimeout(async () => {
  console.log('a_s', await a_s.getValue()); // 11
  console.log('d_s', await d_s.getValue()); // 18
}, 5000);

//
// Infinite Array
//

const infArr = new InfiniteArray([51, 52, 53, 54, 55]);

const iArrStream = new Stream(infArr);

(async () => {
  for await (const value of iArrStream) {
    console.log('iArrStream 1:', value);
  }
})();

setTimeout(() => infArr.push(56), 6000);
setTimeout(() => infArr.push(57), 8000);

const iArrMapTakeStream = iArrStream.take(6).map((val) => val * 10);

(async () => {
  for await (const value of iArrMapTakeStream) {
    console.log('iArrMapTakeStream 1:', value);
  }
})();
