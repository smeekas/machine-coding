import { MouseEventHandler, useEffect, useState } from "react";
import { getData } from "./getData";

type ListOfUserProps = {
  onClick: (name: string) => void;
  text: string;
};
function ListOfUser({ onClick, text }: ListOfUserProps) {
  console.log(text);
  const [fetchedData, setFetchedData] = useState<string[]>([]);
  const onClickHandler: MouseEventHandler<HTMLUListElement> = (e) => {
    const element = e.target as HTMLElement;
    if (element.tagName === "LI") {
      const name = element.dataset.name;
      if (name) {
        onClick(name);
      }
    }
  };
  useEffect(() => {
    (async () => {
      const newData = await getData(text);
      setFetchedData(newData as string[]);
    })();
  }, [text]);
  return (
    <div>
      choose
      <ul onClick={onClickHandler}>
        {fetchedData.map((dataItem) => {
          return (
            <li key={dataItem} data-name={dataItem}>
              {dataItem}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ListOfUser;
