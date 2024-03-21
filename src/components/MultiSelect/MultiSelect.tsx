import {
  KeyboardEventHandler,
  MouseEventHandler,
  useRef,
  useState,
} from "react";
import List from "./List";
import styles from "./MultiSelect.module.css";
import { ListEntry } from "./MultiSelect.types";

function MultiSelect() {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedValues, setSelectedValues] = useState<ListEntry[]>([]);
  const [valueSet, setValueSet] = useState<Set<string>>(new Set());

  const [searchedValue, setSearchedValue] = useState("");

  const openHandler = () => {
    setOpen(true);
  };

  const closeHandler = () => {
    setOpen(false);
  };

  const onSelect = (value: ListEntry) => {
    if (valueSet.has(value.value)) {
      setValueSet((prev) => {
        prev.delete(value.value);
        return prev;
      });
      setSelectedValues((prev) =>
        prev.filter((item) => item.value !== value.value)
      );
    } else {
      setSelectedValues((prev) => [...prev, value]);
      setValueSet((prev) => {
        prev.add(value.value);
        return prev;
      });
    }
    closeHandler();
    setSearchedValue("");
    focusOnInput();
  };

  const focusOnInput = () => inputRef.current?.focus();

  const onSearch = (value: string) => {
    setSearchedValue(value);
  };

  const onKeyDownHandler: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.code === "Backspace") {
      if (searchedValue.length === 0) {
        const newSelectedValues = [...selectedValues];
        const deletedValue = newSelectedValues.pop();
        setSelectedValues(newSelectedValues);
        if (deletedValue) {
          setValueSet((prev) => {
            prev.delete(deletedValue?.value);
            return prev;
          });
        }
      }
    }
  };

  const clickHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    const elementDataset = (e.target as HTMLElement).dataset;

    if ("chip" in elementDataset) {
      const chipValue = elementDataset.value;
      if (chipValue) {
        setValueSet((prev) => {
          prev.delete(chipValue);
          return prev;
        });
        setSelectedValues((prev) =>
          prev.filter((item) => item.value !== elementDataset.value)
        );
      }
    } else {
      openHandler();
      focusOnInput();
    }
  };
  return (
    <div className={styles.container}>
      <div
        onClick={clickHandler}
        onKeyDown={() => (openHandler(), focusOnInput())}
        className={styles.inputContainer}
      >
        {selectedValues.map((svs) => (
          <div className={styles.chip} key={svs.value}>
            <span> {svs.label}</span>
            <span data-chip="true" data-value={svs.value}>
              &#x2718;
            </span>
          </div>
        ))}

        <input
          className={styles.input}
          ref={inputRef}
          placeholder="select..."
          onKeyDown={onKeyDownHandler}
          value={searchedValue}
          onChange={(e) => onSearch(e.target.value)}
        />
        {open && (
          <List
            onSelect={onSelect}
            searchString={searchedValue}
            valueSet={valueSet}
          />
        )}
      </div>
    </div>
  );
}

export default MultiSelect;
