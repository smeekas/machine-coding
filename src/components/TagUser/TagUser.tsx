import { KeyboardEventHandler, useEffect, useState } from "react";
import ListOfUser from "./ListOfUser";

function TagUser() {
  const [open, setOpen] = useState<number | null>(null);

  const [areaContent, setAreaContent] = useState("");
  const onKeyDownHandler: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "@" && open === null) {
      setOpen(areaContent.length);
    } else if (e.code === "Backspace") {
      if (open !== null) {
        const areaLength = areaContent.length;
        const deletedChar = areaContent[areaLength - 1];
        if (deletedChar === "@" && open === areaContent.length - 1) {
          setOpen(null);
        }
      }
    }
  };
  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        setOpen(null);
        document.removeEventListener("keydown", keyDownHandler);
      }
      e.stopPropagation();
    };
    if (open !== null) {
      document.addEventListener("keydown", keyDownHandler);
    } else {
      document.removeEventListener("keydown", keyDownHandler);
    }
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [open]);
  const onClickHandler = (name: string) => {
    setAreaContent((prev) => {
      if (open != null) {
        const val = prev.slice(0, open);

        return val + name;
      }
      return prev;
    });
    setOpen(null);
  };
  const textToBeSearched = open !== null ? areaContent.slice(open + 1) : "";
  return (
    <>
      <div>
        <textarea
          value={areaContent}
          onChange={(e) => setAreaContent(e.target.value)}
          onKeyDownCapture={onKeyDownHandler}
          placeholder="type @ to tag user"
        />
        {open !== null && (
          <ListOfUser onClick={onClickHandler} text={textToBeSearched} />
        )}
      </div>
    </>
  );
}

export default TagUser;
