import { MouseEventHandler, useState } from "react";
import styles from "./SelectableGrid.module.css";
function SelectableGrid() {
  const ROWS = 30;
  const COLS = 50;
  const total = ROWS * COLS;
  const [start, setStart] = useState<null | number>(null);
  const [stop, setStop] = useState<null | number>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const onMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    const datasets = (e.target as HTMLElement).dataset;
    if (!isMouseDown) {
      setIsMouseDown(true);
    }
    if (datasets.index) {
      setStart(+datasets.index);
      setStop(null);
    }
  };
  const onMouseUp: MouseEventHandler<HTMLDivElement> = (e) => {
    const datasets = (e.target as HTMLElement).dataset;
    if (datasets.index) {
      setStop(+datasets.index);
      setIsMouseDown(false);
    }
  };

  const onMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    const datasets = (e.target as HTMLElement).dataset;
    if (datasets.index && isMouseDown) {
      setStop(+datasets.index);
    }
  };
  const getRow = (index: number) => {
    return +Math.floor(index / COLS);
  };

  const getCol = (index: number) => {
    const rows = getRow(index);
    return +(index - rows * COLS).toFixed(0);
  };
  const isInside = (index: number) => {
    if (start && stop) {
      const row = getRow(index);
      const col = getCol(index);
      const startRow = getRow(start);
      const startCol = getCol(start);

      const stopRow = getRow(stop);
      const stopCol = getCol(stop);

      let rowValidation = false;
      let colValidation = false;
      if (startRow < stopRow) {
        rowValidation = startRow <= row && row <= stopRow;
      } else {
        rowValidation = stopRow <= row && row <= startRow;
      }
      if (startCol < stopCol) {
        colValidation = startCol <= col && col <= stopCol;
      } else {
        colValidation = stopCol <= col && col <= startCol;
      }
      return rowValidation && colValidation;
    }
    return false;
  };
  return (
    <>
      <div
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        className={styles.grid}
        style={{ gridTemplateColumns: `repeat(${COLS},1fr)` }}
      >
        {Array(total)
          .fill(null)
          .map((_, index) => {
            return (
              <div
                data-index={index}
                key={index}
                className={`${styles.gridItem} ${
                  isInside(index) && styles.active
                }`}
              >
                {/* {getRow(index)}, {getCol(index)} {"="}
                {index} */}
              </div>
            );
          })}
      </div>
    </>
  );
}

export default SelectableGrid;
