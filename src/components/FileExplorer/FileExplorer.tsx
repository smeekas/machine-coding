import { useState } from "react";
import { AddNode, ExplorerData, RemoveNodeHandler } from "./file.types";
import { dummyData } from "./data";
import styles from "./FileExplorer.module.css";
import Folder from "./Folder";
import useTraverseTree from "./useTraverseTree";

function FileExplorer() {
  const [data, setData] = useState<ExplorerData>(dummyData);

  const { insertNode, removeNode } = useTraverseTree();
  const addNode: AddNode = (id, isFolder, name) => {
    setData(insertNode(data, id, isFolder, name));
  };
  const removenodeHandler: RemoveNodeHandler = (id) => {
    setData(removeNode(data, id));
  };
  return (
    <div className={styles.container}>
      <Folder
        explorerData={data}
        insertNode={addNode}
        removeNode={removenodeHandler}
      />
    </div>
  );
}

export default FileExplorer;
