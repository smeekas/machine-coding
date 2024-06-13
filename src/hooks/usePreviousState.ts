import { useEffect, useRef } from "react";

export default function usePreviousState<T>(state: T) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    ref.current = state;
  }, [state]);
  return ref.current;
}
