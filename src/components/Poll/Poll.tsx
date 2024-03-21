import { Fragment, MouseEventHandler, useState } from "react";
import styles from "./Poll.module.css";

const config = {
  java: { color: "orange", current: 0 },
  golang: { color: "teal", current: 0 },
  "c++": { color: "blue", current: 0 },
};
type ConfigKeys = keyof typeof config;

function Poll() {
  const [pollData, setPollData] = useState(config);
  const pollKeys = Object.keys(config);
  const total = pollKeys.reduce((acc, current) => {
    return acc + pollData[current as ConfigKeys].current;
  }, 0);

  const clickHandler: MouseEventHandler<HTMLElement> = (e) => {
    const dataKey = (e.target as HTMLButtonElement).dataset.key as ConfigKeys;
    setPollData((prev) => {
      const newData = { ...prev };
      newData[dataKey].current += 1;
      return newData;
    });
  };
  return (
    <div className={styles.container}>
      <div className={styles.grid} onClick={clickHandler}>
        {pollKeys.map((pollItem) => {
          const currentWidth = pollData[pollItem as ConfigKeys].current;
          const newWidth =
            currentWidth === 0 ? 0 : (currentWidth / total) * 100;
          return (
            <Fragment key={pollItem}>
              <span>
                {pollItem}({pollData[pollItem as ConfigKeys].current})
              </span>
              <div
                className={styles.pollBar}
                style={{
                  width: `${newWidth}%`,
                  backgroundColor: pollData[pollItem as ConfigKeys].color,
                }}
              />
              <button data-key={pollItem}>vote</button>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default Poll;
