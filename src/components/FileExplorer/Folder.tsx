import { FocusEvent, KeyboardEvent, MouseEvent, useState } from "react";
import { AddNode, ExplorerData, RemoveNodeHandler, Type } from "./file.types";
import styles from "./FileExplorer.module.css";
type FolderProps = {
  explorerData: ExplorerData;
  insertNode: AddNode;
  removeNode: RemoveNodeHandler;
};
function Folder({ explorerData, insertNode, removeNode }: FolderProps) {
  const [showContent, setShowContent] = useState(false);
  const [showInput, setShowInput] = useState<Type | null>(null);
  const openContent = (typeOfItem: Type) => {
    setShowInput(typeOfItem);
  };
  const onAddFile = () => {
    openContent("file");
  };
  const onAddFolder = () => {
    openContent("folder");
  };
  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    //add new
    const target = e.target as HTMLInputElement;
    if (showInput && target.value.trim().length > 0) {
      insertNode(explorerData.id, showInput === "folder", e.target.value);
    }
    setShowInput(null);
    setShowContent(true);
  };
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (e.key === "Enter") {
      if (showInput && target.value.trim().length > 0) {
        insertNode(explorerData.id, showInput === "folder", target.value);
        setShowInput(null);
        setShowContent(true);
      }
    } else if (e.key === "Escape") {
      if (showInput && target.value.trim().length > 0) {
        insertNode(explorerData.id, showInput === "folder", target.value);
      }
      setShowInput(null);
      setShowContent(true);
    }
  };
  const onDelete = (e: MouseEvent) => {
    e.stopPropagation();
    removeNode(explorerData.id);
  };
  if (explorerData.isFolder) {
    return (
      <div className={styles.folder}>
        <span
          className={styles.name}
          onClick={() => setShowContent((prev) => !prev)}
        >
          📂 {explorerData.name}
          <div className={styles.btnGroup}>
            <button onClick={onAddFolder}>+ folder</button>
            <button onClick={onAddFile}>+ file</button>
            <button onClick={onDelete}>d</button>
          </div>
        </span>
        {showInput && (
          <input
            autoFocus
            placeholder="add"
            onBlur={onBlur}
            onKeyDown={onKeyDown}
          />
        )}
        {(showContent || showInput) &&
          explorerData.items.map((subItem) => {
            return (
              <Folder
                explorerData={subItem}
                key={subItem.id}
                insertNode={insertNode}
                removeNode={removeNode}
              />
            );
          })}
      </div>
    );
  }
  return (
    <div className={styles.file}>
      <span className={styles.name}>
        {" "}
        📄 {explorerData.name}
        <div className={styles.btnGroup}>
          <button onClick={onDelete}>d</button>
        </div>
      </span>
    </div>
  );
}

export default Folder;
