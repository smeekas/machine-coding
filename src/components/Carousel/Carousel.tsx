import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./Carousel.module.css";

type CarouselProps = {
  images: { src: string; alt: string }[];
  width: number;
  autoplay?: { duration: number };
  infinite?: boolean;
};
function Carousel({ images, width, autoplay, infinite }: CarouselProps) {
  const [currIndex, setCurrIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  // onImageChange =>curr, next Indexes
  // onPrev
  // onNext
  //
  const maxImages = useMemo(() => images.length, [images.length]);
  const onPrev = () => {
    setCurrIndex((prev) => (prev - 1 <= 0 ? 0 : prev - 1));
  };
  const onNext = useCallback(() => {
    // setCurrIndex
    setCurrIndex((prev) =>
      prev + 1 === maxImages && !infinite
        ? maxImages - 1
        : prev + (1 % maxImages)
    );
  }, [maxImages, infinite]);

  useEffect(() => {
    const containerElement = containerRef.current;
    if (containerElement) {
      containerElement.scrollTo({
        behavior: "smooth",
        left: (currIndex % maxImages) * width,
      });
    }
  }, [currIndex, width, maxImages]);
  useEffect(() => {
    if (autoplay) {
      setInterval(() => {
        onNext();
      }, autoplay.duration);
    }
  }, [autoplay, onNext]);
  return (
    <div className={styles.carousel}>
      <div
        className={styles.carouselImages}
        ref={containerRef}
        style={{ width }}
      >
        {images.map((imageItem) => {
          return (
            <img
              key={imageItem.alt}
              src={imageItem.src}
              alt={imageItem.alt}
              className={styles.carouselImage}
              //   width={width}
            />
          );
        })}
      </div>
      <button
        onClick={onPrev}
        className={`${styles.carouselBtn} ${styles.left}`}
        aria-label="previous"
      >
        L
      </button>
      <button
        onClick={onNext}
        className={`${styles.carouselBtn} ${styles.right}`}
        aria-label="next"
      >
        R
      </button>
      <div className={styles.dots}>
        {Array(maxImages)
          .fill(null)
          .map((_, index) => (
            <div
              aria-current={index === currIndex % maxImages}
              aria-label={`slide ${index + 1}`}
              className={`${styles.dot} ${
                index === currIndex % maxImages ? styles.activeDot : null
              }`}
            />
          ))}
      </div>
    </div>
  );
}

export default Carousel;
