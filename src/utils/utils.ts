import type { ShelfList } from '../types/shelf';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const debounce = (func: any, delay = 500) => {
  let timeout: null | ReturnType<typeof setTimeout> = null;
  return (...args: any[]) => {
    clearTimeout(Number(timeout));
    timeout = setTimeout(() => {
      func.apply(this, args);
      timeout = null;
    }, delay);
  };
};

export const debounceLeading = (func: any, delay = 500, option = {
  leading: true, trailing: true,
}) => {
  let timeout: null | ReturnType<typeof setTimeout> = null;
  return (...args: any[]) => {
    let isInvoked = false;
    if (!timeout && option.leading) {
      func.apply(this, args);
      isInvoked = true;
    }
    clearTimeout(Number(timeout));
    timeout = setTimeout(() => {
      if (option.trailing && !isInvoked) {
        func.apply(this, args);
      }
      timeout = null;
    }, delay);
  };
};

export const throttle = (func: any, delay = 500) => {
  let timeout: null | ReturnType<typeof setTimeout> = null;
  let lastRan: number;
  let firstRan: boolean;
  return (...args: any[]) => {
    if (!lastRan) {
      func.apply(this, args);
      lastRan = new Date().getTime();
    } else {
      if (!timeout) {
        func.apply(this, args);
        lastRan = new Date().getTime();
        firstRan = true;
      }
      clearTimeout(Number(timeout));
      timeout = setTimeout(() => {
        if ((new Date().getTime() - lastRan) >= delay && firstRan) {
          func.apply(this, args);
          lastRan = new Date().getTime();
          timeout = null;
        }
      }, delay - (new Date().getTime() - lastRan));
    }
  };
};

export const bookCoverAttr = {
  width: 128,
  height: 207
}


export const arraysAreEqual = (a: ShelfList[], b: ShelfList[]) => {
  const n = a.length;
  const m = b.length;

  if (n != m) {
    return false;
  }

  // Create 2 unordered maps to store
  // the frequency
  const mp1 = new Map();
  const mp2 = new Map();

  for (const i of a) {
    if (mp1.get(i.id) !== undefined)
      mp1.set(i.id, mp1.get(i.id) + 1);
    else
      mp1.set(i.id, 1);
  }
  for (const i of b) {
    if (mp2.get(i.id) !== undefined)
      mp2.set(i.id, mp2.get(i.id) + 1);
    else
      mp2.set(i.id, 1);
  }

  // Compare the frequency
  for (const i of mp1.keys()) {
    // If frequency not same return false
    if (mp2.get(i) !== mp1.get(i)) {
      return false;
    }
  }
  return true;
}