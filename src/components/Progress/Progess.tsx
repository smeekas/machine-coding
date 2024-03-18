import React, { useEffect, useState } from "react";
import styles from "./Progress.module.css";
type ProgressProps = {
  progress: number;
  onCompleted?: () => void;
  onProgress?: (value: number) => void;
};
function Progress({ progress, onCompleted, onProgress }: ProgressProps) {
  const [value, setValue] = useState(progress);
  useEffect(() => {
    if (progress >= 0 && progress <= 100) {
      setValue(progress);
    }
    onProgress?.(progress);
    if (progress === 100) {
      onCompleted?.();
    }
  }, [progress, onCompleted, onProgress]);
  const innerStyle: React.CSSProperties = {
    width: `${value}%`,
  };
  return (
    <div className={styles.outer}>
      <span className={styles.indicator}>{value}%</span>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        style={innerStyle}
        className={styles.inner}
      ></div>
    </div>
  );
}

export default Progress;
