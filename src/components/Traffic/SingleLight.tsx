import React from "react";
import styles from "./Traffic.module.css";
type SingleLightProps = {
  color: string;
  isActive: boolean;
};
function SingleLight({ color, isActive }: SingleLightProps) {
  const actualColor = isActive ? color : "grey";
  return (
    <div
      style={{ backgroundColor: actualColor }}
      className={styles.singleLight}
    />
  );
}

export default SingleLight;
