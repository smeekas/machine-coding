import { useRef } from "react";

export default function useMyMemo<T extends () => unknown, K extends unknown[]>(
  callback: T,
  deps: K
) {
  const memoizedRef = useRef<{ deps: K; value: ReturnType<T> }>({
    deps,
    value: callback() as ReturnType<T>,
  });
  if (memoizedRef === null || !isEqual(memoizedRef.current?.deps, deps)) {
    memoizedRef.current = {
      value: callback() as ReturnType<T>,
      deps,
    };
  }
  return memoizedRef.current?.value;
}

function isEqual(deps: unknown[], newDeps: unknown[]) {
  if (deps.length !== newDeps.length) return false;
  for (let i = 0; i < deps.length; i++) {
    if (!Object.is(deps[i], newDeps[i])) {
      return false;
    }
  }

  return true;
}
