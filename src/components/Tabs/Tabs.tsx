import React, { KeyboardEvent, useId, useState } from "react";
import styles from "./Tabs.module.css";
type TabsProps = {
  items: {
    key: string;
    label: string;
    content: React.ReactNode;
  }[];
};
function getTabId(item: TabsProps["items"][number], id: string) {
  return `tab-${id}-${item.key}`;
}
function getTabPanelId(item: TabsProps["items"][number], id: string) {
  return `tabPanel-${id}-${item.key}`;
}
function Tabs({ items }: TabsProps) {
  const id = useId();
  const [activeKey, setActiveKey] = useState(items[0].key);

  const setWithIndex = (index: number) => {
    setActiveKey(items[index].key);
    document.getElementById(getTabId(items[index], id))?.focus();
  };
  const onKeyDown = (e: KeyboardEvent) => {
    const currIndex = items.findIndex((item) => item.key === activeKey);
    if (currIndex === -1) return;
    if (e.key === "ArrowRight") {
      setWithIndex((currIndex + 1) % items.length);
    } else if (e.key === "ArrowLeft") {
      setWithIndex((currIndex + items.length - 1) % items.length);
    }
  };
  return (
    <div>
      <div role="tablist" onKeyDown={(e) => onKeyDown(e)}>
        {items.map((item) => {
          const isActive = activeKey === item.key;
          return (
            <button
              role="tab"
              onClick={() => setActiveKey(item.key)}
              key={item.key}
              id={getTabId(item, id)}
              tabIndex={isActive ? 0 : -1}
              className={isActive ? styles.active : ""}
              aria-controls={getTabPanelId(item, id)}
              aria-selected={isActive}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <div>
        {items.map((item) => {
          const isActive = activeKey === item.key;

          return (
            <>
              {isActive ? (
                <div
                  role="tabpanel"
                  key={item.key}
                  id={getTabPanelId(item, id)}
                  tabIndex={0}
                  aria-labelledby={getTabId(item, id)}
                >
                  {item.content}
                </div>
              ) : null}
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Tabs;
