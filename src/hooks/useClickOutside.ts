import { useEffect, useRef } from "react";

type UseClickOutsideProps = () => void;
export default function useClickOutside<T extends HTMLElement>(
  callback: UseClickOutsideProps
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    document.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (ref.current && !ref.current.contains(target)) {
        // if any element inside ref is not clicked then we can call callback
        callback();
      }
    });
  }, []);

  return ref;
}
