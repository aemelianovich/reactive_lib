import Stream, { InfiniteEvents, applyEventsOrder } from '../dist/index.js';

function getTopLeft(element) {
  const box = element.getBoundingClientRect();
  return {
    top: box.top + window.scrollY,
    left: box.left + window.scrollX,
  };
}

const box = document.getElementById('box');
const container = document.getElementById('dndarea');
const shiftX = box.offsetWidth / 2;
const shiftY = box.offsetHeight / 2;
const { top, left } = getTopLeft(container);

//
// Create dnd Strean
const pointerdown$ = new Stream(new InfiniteEvents(box, 'pointerdown'));
const pointermove$ = new Stream(
  new InfiniteEvents(document.body, 'pointermove'),
);
const pointerup$ = new Stream(new InfiniteEvents(document.body, 'pointerup'));

const dnd$ = Stream.mergeOrderedTuple(pointerdown$, pointermove$, pointerup$)
  .filter((tuple) => applyEventsOrder(tuple, ['pointermove', 'pointerdown']))
  .map((tuple) => tuple[0].payload);

//
// Move box when dnd event occured
(async () => {
  for await (const event of dnd$) {
    if (
      event.pageX - shiftX > left &&
      event.pageX + shiftX < left + container.offsetWidth
    ) {
      box.style.left = event.pageX - left - shiftX + 'px';
    }
    if (
      event.pageY - shiftY > top &&
      event.pageY + shiftY < top + container.offsetHeight
    ) {
      box.style.top = event.pageY - top - shiftY + 'px';
    }
  }
})();
