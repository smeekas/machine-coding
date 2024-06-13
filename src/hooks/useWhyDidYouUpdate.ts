import { useEffect, useRef } from "react";

export default function useWhyDidYouUpdate<T extends Record<string, unknown>>(
  props: T
) {
  const ref = useRef<T>(props);
  useEffect(() => {
    const allKeys = new Set([
      ...Object.keys(props),
      ...Object.keys(ref.current),
    ]);
    const changed: { [key: string]: { from: unknown; to: unknown } } = {};

    allKeys.forEach((keyItem) => {
      const prevItem = ref.current[keyItem];
      const newItem = props[keyItem];
      if (typeof prevItem === "object" && typeof newItem === "object") {
        if (JSON.stringify(prevItem) !== JSON.stringify(newItem)) {
          changed[keyItem] = {
            from: prevItem,
            to: newItem,
          };
        }
      } else {
        if (prevItem !== newItem) {
          changed[keyItem] = {
            from: prevItem,
            to: newItem,
          };
        }
      }
    });
    if (Object.keys(changed).length > 0) {
      console.log(changed);
    }
    ref.current = props;

    // no dependencies in useEffect because we want effect to run on every render
  });
}
