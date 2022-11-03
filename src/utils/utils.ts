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
