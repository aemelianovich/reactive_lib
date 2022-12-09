[![Maintainability](https://api.codeclimate.com/v1/badges/243d003a0181923ef033/maintainability)](https://codeclimate.com/github/aemelianovich/reactive_lib/maintainability)
[![Node CI](https://github.com/aemelianovich/reactive_lib/actions/workflows/nodejs.yml/badge.svg)](https://github.com/aemelianovich/reactive_lib/actions/workflows/nodejs.yml)
[![Test Coverage](https://api.codeclimate.com/v1/badges/243d003a0181923ef033/test_coverage)](https://codeclimate.com/github/aemelianovich/reactive_lib/test_coverage)

# Reactive lib based on AsyncIterators

Implementation of stream based on AsyncIterators with advanced functionality

Basic structures:

- Stream

  - Modificator methods:
    - enumerate
    - filter
    - map
    - take
  - Aggregator static methods:
    - zip
    - merge

- Producers:
  - InfiniteArray
  - InfiniteMap
  - InfiniteSet
  - InfiniteEvents
  - Value
  - RandomValue

## Stream:

Stream is an lazy event emitter which can accept any Iterable or AsyncIterable as producer.
Based on the stream you can create AsyncTterator and recieve a new value from the stream

    ```js
    import Stream from './src';

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
    ```

## Stream Modificator Methods:

Stream methods that allows to modify original Sream and create new modified Stream

```js
interface Modificators<T> {
  map<R>(this: Stream<T>, ...fns: ((value: T) => R)[]): Stream<R>;
  take<T>(this: Stream<T>, max: number): Stream<T>;
  filter<T>(this: Stream<T>, fn: (value: T) => boolean): Stream<T>;
  enumerate<T>(this: Stream<T>): Stream<(number | T)[]>;
}
```

```js
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
```

### Enumerate:

Transforms each event from the input Stream by adding index - [index, value],
to get a Stream that emits those transformed events.

Marble diagram:

```text
--1---3--5-----7------
   enumerate(stream)
--[0,1]--[1,3]--[2,5]--[3,7]-----
```

### Filter:

Check each event from the input Stream through a cb(callback) function,
to get a Stream that emits events that passed a check.

Marble diagram:

```text
--10--30--20--5--70------
   filter(i => i > 30)
-----30----------70-----
```

### Map:

Transforms each event from the input Stream through a cb(callback) functions,
to get a Stream that emits those transformed events.

Marble diagram:

```text
--1---3--5-----7------
    map(i => i * 10, i => i + 3)
--13--33-53----73-----
```

### Take:

Lets the first number of events from the input stream pass to the
output stream, then makes the output stream complete.

Marble diagram:

```text
--a---b--c----d---e--
    take(3)
--a---b--c|
```

## Stream Aggregators static methods:

Stream static methods that allowds to aggregate diffirent streams into one

```js
Stream.zip(...streams: Array<Stream<any>>): Stream<Array<any>>
Stream.merge(...streams: Array<Stream<any>>): Stream<Array<any>>
```

```js
const stream = new Stream([-1, -2, -3, -4, -5, -6]);
const takeStream = new Stream([1, 2, 3, 4, 5, 6]).take(4);
const mapStream = new Stream([1, 2, 3, 4, 5, 6]).take(3).map(
  (val) => val * 10,
  (val) => val + 13,
);

const zipStream = Stream.zip(mapStream, stream, takeStream);

(async () => {
  for await (const value of zipStream) {
    console.log('Zip Stream 1:', value);
  }
})();

(async () => {
  for await (const value of zipStream) {
    console.log('Zip Stream 2:', value);
  }
})();

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
```

### Zip:

Zips multiple input streams together to return a stream whose events
are arrays that collect the latest events from each input stream.

It's essentially a way of joining together
the events from multiple streams.

Marble diagram:

```text
--1----2-----3--------4---
----a-----b-----c--d------
         zip
----[1,a]-[2,a]-[2,b]-[3,b]-[3,c]-[3,d]-[4,d]--
```

### Merge:

Merge multiple input streams together to return a stream whose events
are values from each input stream.

Marble diagram:

```text
--1----2-----3--------4---
----a-----b-----c--d------
         merge
--1-a--2--b--3--c--d--4---
```

## Producers:

Creates special async iterable producers based that can be used for creating streams

### InfiniteArray:

Creates special async iterable Array based on passed Array
Async Iterator won't be completed and new value will be generated
by push method.

```js
import { InfiniteArray } from './src';

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
```

### InfiniteMap:

Creates special async iterable Map based on passed Map
Async Iterator won't be completed and new value will be generated
by set method.

```js
import { InfiniteMap } from './src';

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
```

### InfiniteSet:

Creates special async iterable Set based on passed Set
Async Iterator won't be completed and new value will be generated
by add method.

```js
import { InfiniteSet } from './src';

const s = new Set([110, 120, 130]);
const infSet = new InfiniteSet(s);

const iSetStream = new Stream(infSet);

(async () => {
  for await (const value of iSetStream) {
    console.log('iSetStream 1:', value);
  }
})();

setTimeout(() => infSet.add(140), 6000);
setTimeout(() => infSet.add(150), 8000);

const isetMapTakeStream = iSetStream.take(6).map((val) => val * 10);

(async () => {
  for await (const value of isetMapTakeStream) {
    console.log('isetMapTakeStream 1:', value);
  }
})();
```

### InfiniteEvents:

Creates special async iterable based on passed EventTarget or EventEmitter and Event type
Each time when new event will be occured the new special InfiniteEvent value will be generated by async iterator

InfiniteEvent value interface:

```js
class InfiniteEvent {
  target: EventTarget | EventEmitter;
  event: string;
  payload: Event | any[] | null;
}
```

Example:

```js
import { InfiniteEvents } from './producers';

// Infinite Events from node
const myEE = new EventEmitter();
const infEvents = new InfiniteEvents(myEE, 'click');

const iEventStream = new Stream(infEvents);

(async () => {
  for await (const value of iEventStream) {
    console.log('iEventStream 1:', value.payload);
  }
})();

setTimeout(() => myEE.emit('click'), 2000);
setTimeout(() => myEE.emit('click', 'it is my click 1'), 4000);
setTimeout(() => myEE.emit('click', 'it is my click 2'), 6000);
setTimeout(() => myEE.emit('click', 'it is my click 3'), 8000);

const iEventMapTakeStream = iEventStream.take(3).map(() => 'Map Map Map');

(async () => {
  for await (const value of iEventMapTakeStream) {
    console.log('iEventMapTakeStream 1:', value);
  }
})();

// Infinite Events from browser
const infEventsBrowser = new InfiniteEvents(document, 'click');
const iEventBrowserStream = new Stream(infEventsBrowser);

(async () => {
  for await (const value of iEventBrowserStream) {
    console.log('iEventBrowserStream 1:', value.payload);
  }
})();

const iEventBrowserMapTakeStream = iEventBrowserStream
  .take(3)
  .map(() => 'Map Browser Map Browser Map Browser');

(async () => {
  for await (const value of iEventBrowserMapTakeStream) {
    console.log('iEventBrowserMapTakeStream 1:', value);
  }
})();
```

### Value:

Creates special async iterable producer based on primitive value
Async Iterator won't be completed and new value will be generated
by updateValue method.

```js
import { Value } from './src';

const a = new Value() < number > 1;
const b = new Value() < number > 2;

const a_s = new Stream() < number > a;
const b_s = new Stream() < number > b;
const c_s = Stream.zip(a_s, b_s);
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
```

### RandomValue:

Creates special async iterable producer based on primitive random value
between min and max numbers
Async Iterator won't be completed and new value will be generated.

```js
import { RandomValue } from './src';

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
```
