import type { InfiniteEvent } from '../producers/index.js';
/**
 * Filter function that allowed to filter events tuple to get events in particular order
 */
function applyEventsOrder(
  tuple: (InfiniteEvent | undefined)[],
  eventsOrder: string[],
): boolean {
  let res = true;
  for (let i = 0; i < eventsOrder.length; i++) {
    if (!(eventsOrder[i] === tuple[i]?.event)) {
      res = false;
    }
  }
  return res;
}

export default applyEventsOrder;
