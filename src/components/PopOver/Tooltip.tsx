import {
  cloneElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import styles from "./Tooltip.module.css";

type TooltipProps = {
  children: React.ReactElement;
  mode?: "hover" | "click";
  mouseFollow?: boolean;
  title: string;
};
function Tooltip({
  children,
  mode = "hover",
  mouseFollow = false,
  title,
}: TooltipProps) {
  const ref = useRef<HTMLElement>(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [pos, setPos] = useState({ left: 0, top: 0 });

  const onMouseEnter = useCallback(
    (e: MouseEvent) => {
      setIsEnabled(true);
      if (ref.current) {
        console.dir(ref.current);
        setPos({
          top: ref.current.offsetTop + ref.current.offsetHeight + 10,
          left: ref.current.offsetLeft + ref.current.offsetWidth / 2,
        });
      }
      children.props.onMouseEnter?.(e);
    },
    [children]
  );
  const onMouseLeave = useCallback(
    (e: MouseEvent) => {
      setIsEnabled(false);
      children.props.onMouseLeave?.(e);
    },
    [children]
  );
  const onClick = useCallback(
    (e: MouseEvent) => {
      setIsEnabled(true);
      children.props.onClick?.(e);
    },
    [children]
  );
  const onBlur = useCallback(
    (e: FocusEvent) => {
      setIsEnabled(false);
      children.props.onBlur?.(e);
    },
    [children]
  );
  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      setPos({ top: e.clientY + 10, left: e.clientX + 10 });
      children.props.onMouseMove?.(e);
    },
    [children]
  );
  const listeners = useMemo(() => {
    let events: object = {};
    if (mode === "hover") {
      events = { onMouseEnter, onMouseLeave };
    } else if (mode === "click") {
      events = { onClick, onBlur };
    }
    if (mouseFollow) {
      events = { ...events, onMouseMove };
    }
    return events;
  }, [
    mode,
    mouseFollow,
    onBlur,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
  ]);

  const cloned = useMemo(
    () =>
      cloneElement(children, {
        ref,
        ...listeners,
        tabIndex: 0,
      }),
    [children, listeners]
  );

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPos({
        left: rect.left,
        top: rect.top + rect.height,
      });
    }
  }, []);
  return (
    <>
      {isEnabled &&
        createPortal(
          <div
            className={styles.popover}
            style={{ left: pos.left, top: pos.top }}
          >
            <span>{title}</span>
          </div>,
          document.body
        )}
      {cloned}
    </>
  );
}
export default Tooltip;
