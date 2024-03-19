import { useEffect, useState } from "react";
import SingleLight from "./SingleLight";

const config = {
  red: { time: 4, color: "red", order: 1 },
  yellow: { time: 2, color: "yellow", order: 2 },
  green: { time: 4, color: "green", order: 3 },
} as const;
type ConfigKeys = keyof typeof config;

function Traffic() {
  const lightKeys = Object.keys(config);

  const [activeKey, setActiveKey] = useState<ConfigKeys | null>(null);

  const startHandler = () => {
    setActiveKey("red");
  };
  const stopHandler = () => {
    setActiveKey(null);
  };
  useEffect(() => {
    if (activeKey) {
      if (activeKey === "red") {
        setTimeout(() => {
          setActiveKey("yellow");
        }, config[activeKey].time * 1000);
      } else if (activeKey === "yellow") {
        setTimeout(() => {
          setActiveKey("green");
        }, config[activeKey].time * 1000);
      } else {
        setTimeout(() => {
          setActiveKey("red");
        }, config[activeKey].time * 1000);
      }
    }
  }, [activeKey]);
  return (
    <div>
      <div>
        {lightKeys.map((lightItem) => {
          const lightValue = config[lightItem as ConfigKeys];
          return (
            <SingleLight
              color={lightValue.color}
              isActive={lightItem === activeKey}
            />
          );
        })}
      </div>
      <div>
        <button onClick={startHandler}>Start</button>
        <button onClick={stopHandler}>stop</button>
      </div>
    </div>
  );
}

export default Traffic;
