import { KeyboardEventHandler, MouseEventHandler, useState } from "react";
import styles from "./Accordion.module.css";
type AccordionProps = {
  items: {
    key: string;
    label: string;
    children: React.ReactNode;
  }[];
  single?: boolean;
};
function Accordion({ items, single }: AccordionProps) {
  const [activeKey, setActiveKey] = useState<{ [key: string]: boolean }>(() => {
    return items.reduce<{ [key: string]: boolean }>((acc, curr) => {
      acc[curr.key] = false;
      return acc;
    }, {});
  });
  const onLabelClick: MouseEventHandler<HTMLElement> = (e) => {
    const target = e.target as HTMLElement;
    const dataset = target.dataset;
    if ("accordionKey" in dataset) {
      const key = dataset["accordionKey"];
      if (key) {
        setActiveKey((prev) => {
          const newState = { ...prev };
          if (single) {
            Object.keys(newState).forEach((keyItem) => {
              if (keyItem === key) {
                newState[keyItem] = !newState[keyItem];
              } else {
                newState[keyItem] = false;
              }
            });
          } else {
            newState[key] = !newState[key];
          }
          return newState;
        });
      }
    }
  };
  const onKeyDown: KeyboardEventHandler<HTMLElement> = (e) => {
    if (e.key !== "Enter") return;
    const target = e.target as HTMLElement;
    const dataset = target.dataset;
    if ("accordionKey" in dataset) {
      const key = dataset["accordionKey"];
      if (key) {
        setActiveKey((prev) => {
          const newState = { ...prev };
          if (single) {
            Object.keys(newState).forEach((keyItem) => {
              if (keyItem === key) {
                newState[keyItem] = !newState[keyItem];
              } else {
                newState[keyItem] = false;
              }
            });
          } else {
            newState[key] = !newState[key];
          }
          return newState;
        });
      }
    }
  };
  return (
    <div className={styles.container}>
      {items.map((item, index) => {
        return (
          <div
            key={item.key}
            onClick={onLabelClick}
            onKeyDown={onKeyDown}
            className={styles.itemContainer}
          >
            <div
              className={`${styles.label} ${
                index === items.length - 1 && styles.noBorder
              }`}
              role="button"
              tabIndex={0}
              aria-expanded={activeKey[item.key]}
              data-accordion-key={item.key}
            >
              {item.label}
            </div>
            <div
              className={`${!activeKey[item.key] && styles.hidden} ${
                styles.content
              } ${styles.transition}`}
            >
              {item.children}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Accordion;
