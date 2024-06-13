import { useEffect, useMemo, useRef, useState } from "react";
import { throttle } from "../utils/throttle";

export default function useIdle(delay: number) {
  const [isIdle, setIsIdle] = useState(false);
  const timerId = useRef<number | null>(null);

  useEffect(() => {
    const handleActivity = throttle(() => {
        // we are throttling for 500 ms for performance reason.
        // If events are firing frequently then throttle will rate limit them

      setIsIdle(false);
      if (timerId.current) clearTimeout(timerId.current);

      timerId.current = setTimeout(() => {
        setIsIdle(true);
      }, delay);
    }, 500);

    document.addEventListener("mousemove", handleActivity);
    document.addEventListener("keydown", handleActivity);
    document.addEventListener("touchstart", handleActivity);
    document.addEventListener("scroll", handleActivity);
    return () => {
      if (timerId.current) clearTimeout(timerId.current);
      document.removeEventListener("mousemove", handleActivity);
      document.removeEventListener("keydown", handleActivity);
      document.removeEventListener("touchstart", handleActivity);
      document.removeEventListener("scroll", handleActivity);
    };
  }, [delay]);
  return useMemo(() => isIdle, [isIdle]);
}
