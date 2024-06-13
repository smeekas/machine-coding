export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
) {
  let isExecuting = false;
  return function (...newArgs: Parameters<T>) {
    if (!isExecuting) {
      isExecuting = true;
      func(...newArgs);
      setTimeout(() => {
        isExecuting = false;
      }, delay);
    }
  };
}
