import { MouseEventHandler, useEffect, useState } from "react";
import styles from "./MultiSelect.module.css";
import { ListProps, ListEntry, UserType } from "./MultiSelect.types";

function List({ onSelect, searchString, valueSet }: ListProps) {
  const [listValues, setListValues] = useState<ListEntry[]>([]);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    const fetchFn = async () => {
      try {
        const url = `https://dummyjson.com/users/search?q=${searchString}`;
        const res = await fetch(url);
        const { users } = await res.json();
        const convertedData: ListEntry[] = (users as UserType[]).map(
          (userItem) => ({
            label: `${userItem.firstName} ${userItem.lastName}`,
            value: userItem.id,
          })
        );
        setListValues(convertedData);
      } catch (err) {
        // alert(err);
      }
    };
    timer = setTimeout(fetchFn, 1000);
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [searchString]);
  const listonClickHandler: MouseEventHandler<HTMLUListElement> = (e) => {
    const value = (e.target as HTMLElement).dataset.value;
    const label = (e.target as HTMLElement).dataset.label;

    if (value && label) {
      onSelect({ label, value });
    }
  };
  valueSet.forEach((val) => console.log(val));
  return (
    <ul
      // onBlur={onBlur}
      className={styles.list}
      onClickCapture={listonClickHandler}
    >
      {listValues.map((listItem) => {
        const IsSelected = valueSet.has(listItem.value.toString());

        return (
          <li
            className={`${IsSelected ? styles.selected : ""}`}
            key={listItem.value}
            data-label={listItem.label}
            data-value={listItem.value}
          >
            {listItem.label}
          </li>
        );
      })}
    </ul>
  );
}

export default List;
