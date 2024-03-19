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
  const orderOfLight = lightKeys.sort((lightA, lightB) => {
    return (
      config[lightA as ConfigKeys].order - config[lightB as ConfigKeys].order
    );
  });

  const [activeKey, setActiveKey] = useState<number | null>(null);

  const startHandler = () => {
    setActiveKey(0);
  };
  const stopHandler = () => {
    setActiveKey(null);
  };
  useEffect(() => {
    if (activeKey !== null) {
      const configData = config[orderOfLight[activeKey] as ConfigKeys];

      setTimeout(() => {
        setActiveKey((prev) => {
          if (prev !== null) return (prev + 1) % orderOfLight.length;
          return prev;
        });
      }, configData.time * 1000);
      //   if (activeKey === "red") {
      //     setTimeout(() => {
      //       setActiveKey("yellow");
      //     }, config[activeKey].time * 1000);
      //   } else if (activeKey === "yellow") {
      //     setTimeout(() => {
      //       setActiveKey("green");
      //     }, config[activeKey].time * 1000);
      //   } else {
      //     setTimeout(() => {
      //       setActiveKey("red");
      //     }, config[activeKey].time * 1000);
      //   }
    }
  }, [activeKey, orderOfLight]);
  return (
    <div>
      <div>
        {orderOfLight.map((lightItem, index) => {
          const lightValue = config[lightItem as ConfigKeys];
          return (
            <SingleLight
              key={lightItem}
              color={lightValue.color}
              isActive={index === activeKey}
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
