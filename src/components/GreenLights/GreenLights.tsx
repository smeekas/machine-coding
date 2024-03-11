import { useState } from "react";
import Box from "./Box";
import styles from "./GreenLights.module.css";

function GreenLights() {
  const boxes = [
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
  ];
  const boxList = boxes.flat(1);
  const totalBoxes = boxList.filter((boxItem) => boxItem === 1).length;
  const [trackList, setTrackList] = useState<number[]>([]);
  const reverseBoxes = () => {
    const interval = setInterval(() => {
      setTrackList((prev) => {
        if (prev.length > 0) {
          const newArr = prev.slice(1);
          return newArr;
        } else {
          clearInterval(interval);
        }
        return prev;
      });
    }, 1000);
  };
  const activateBox = (index: number) => {
    const newArr = [index, ...trackList];
    setTrackList(newArr);
    if (newArr.length === totalBoxes) {
      reverseBoxes();
    }
  };

  return (
    <div
      className={styles.boxGrid}
      style={{ gridTemplateColumns: `repeat(${boxes[0].length},1fr)` }}
    >
      {boxes.flat(1).map((_, index) => {
        return (
          <Box
            onClick={() => activateBox(index)}
            key={index}
            isActive={trackList.includes(index)}
            shouldDisplay={boxList[index] === 1}
          />
        );
      })}
    </div>
  );
}

export default GreenLights;
