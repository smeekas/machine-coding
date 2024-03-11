import React, { useEffect, useState } from "react";
import Box from "./Box";
import styles from "./GreenLights.module.css";
type BoxStates = "active" | "InActive";
type BoxItem = {
  active: BoxStates;
  id: string;
  display: boolean;
};
const DoNotDisplay = new Set();
DoNotDisplay.add(4);
DoNotDisplay.add(5);
DoNotDisplay.add(8);
DoNotDisplay.add(10);
DoNotDisplay.add(11);
DoNotDisplay.add(13);
DoNotDisplay.add(14);




function GreenLights() {
  const [boxList, setBoxList] = useState<BoxItem[]>(() => {
    return Array(15)
      .fill(0)
      .map((_, index) => {
        return {
          active: "InActive",
          id: index,
          display: !DoNotDisplay.has(index),
        };
      });
  });
  const [trackList, setTrackList] = useState<number[]>([]);
  const total = boxList.length - DoNotDisplay.size;
  const totalActive = boxList.filter(
    (boxItem) => boxItem.active === "active"
  ).length;
  const reverseBoxes = () => {
    const interval = setInterval(() => {
      if (trackList.length > 0) {
        const newBoxList = [...boxList];
        newBoxList[trackList[0]].active = "InActive";
        setBoxList(newBoxList);
        const newTrackList = trackList;
        newTrackList.shift();
        setTrackList(newTrackList);
      } else {
        clearInterval(interval);
      }
    }, 1000);
  };
  const activateBox = (index: number) => {
    console.log(index);
    setTrackList((prev) => {
      const newArr = [...prev];
      newArr.unshift(index);
      return newArr;
    });
    setBoxList((prev) => {
      const newArr = [...prev];
      newArr[index].active = "active";
      return newArr;
    });
  };
  useEffect(() => {
    if (total === totalActive) {
      reverseBoxes();
    }
  }, [total, totalActive]);
  return (
    <div className={styles.boxGrid}>
      {boxList.map((boxItem, index) => {
        return (
          <>
            <Box
              onClick={() => activateBox(index)}
              key={index}
              isActive={boxItem.active === "active"}
              shouldDisplay={!DoNotDisplay.has(boxItem.id)}
            />
          </>
        );
      })}
    </div>
  );
}

export default GreenLights;
