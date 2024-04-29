import {
  MouseEventHandler,
  TouchEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./ImageSlider.module.css";
type ImageSliderProps = {
  image1: string;
  image2: string;
  initialPercentage?: number;
};
function ImageSlider({ image1, image2, initialPercentage }: ImageSliderProps) {
  const [isMoverSelected, setIsMoverSelected] = useState(false);
  const [position, setPosition] = useState<null | number>(null);
  const [limits, setLimits] = useState({ min: 0, max: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const onMouseDown = () => {
    setIsMoverSelected(true);
  };
  const onMouseUp = () => {
    setIsMoverSelected(false);
  };
  const onMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    if (isMoverSelected) {
      if (containerRef.current) {
        const dimensions = containerRef.current.getBoundingClientRect();
        let diff = e.clientX - dimensions.left;
        if (diff >= limits.max) diff = limits.max;
        if (diff <= limits.min) diff = limits.min;

        setPosition(diff);
      }
    }
  };
  const onTouchMove: TouchEventHandler<HTMLDivElement> = (e) => {
    if (isMoverSelected) {
      if (containerRef.current) {
        const dimensions = containerRef.current.getBoundingClientRect();
        let diff = e.touches[0].clientX - dimensions.left;
        if (diff >= limits.max) diff = limits.max;
        if (diff <= limits.min) diff = limits.min;

        setPosition(diff);
      }
    }
  };
  useEffect(() => {
    if (containerRef.current) {
      setLimits({ max: containerRef.current.clientWidth - 1, min: 1 });
      if (initialPercentage) {
        setPosition(
          (initialPercentage * containerRef.current.clientWidth) / 100
        );
      } else {
        setPosition(+(containerRef.current.clientWidth / 2).toFixed(0));
      }
    }
  }, [initialPercentage]);
  const width = containerRef.current?.clientWidth ?? 0;
  const diff = position && width ? (position / width) * 100 : 0;
  return (
    <div
      className={styles.container}
      onMouseMoveCapture={onMouseMove}
      onMouseUp={onMouseUp}
      onTouchEnd={onMouseUp}
      onTouchMove={onTouchMove}
      onMouseLeave={onMouseUp}
      ref={containerRef}
      draggable={false}
    >
      <div className={styles.before} draggable={false}>
        <img src={image1} draggable={false} />
      </div>
      <div
        className={styles.after}
        style={{
          clipPath: `polygon(${diff}% 0, 100% 0, 100% 100%, ${diff}% 100%)`,
        }}
        draggable={false}
      >
        <img src={image2} draggable={false} />
      </div>
      <div
        onMouseDown={onMouseDown}
        onTouchStart={onMouseDown}
        id="mover"
        draggable={false}
        className={styles.mover}
        style={position ? { transform: `translateX(${position}px)` } : {}}
      >
        <div draggable={false}></div>
      </div>
    </div>
  );
}

export default ImageSlider;
