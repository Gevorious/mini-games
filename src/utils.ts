export const throttle = <F extends (...args: any[]) => void>(
  fn: F,
  limit: number,
): F => {
  let lastCall = 0;

  return function (this: any, ...args: any[]) {
    const now = Date.now();

    if (now - lastCall >= limit) {
      lastCall = now;
      fn.apply(this, args);
    }
  } as F;
};
