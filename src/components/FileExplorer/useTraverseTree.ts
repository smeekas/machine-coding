import { ExplorerData, InsertNode, RemoveNode } from "./file.types";

function useTraverseTree() {
  const insertNode: InsertNode = (tree, id, isFolder, name) => {
    if (tree.id === id && tree.isFolder) {
      tree.items.push({
        id: Date.now().toString(),
        isFolder,
        name,
        items: [],
      });
      return tree;
    } else {
      const newItems: ExplorerData[] = tree.items.map((subTreeItem) => {
        return insertNode(subTreeItem, id, isFolder, name);
      });

      return { ...tree, items: newItems };
    }
  };
  const removeNode: RemoveNode = (tree, id) => {
    if (tree.isFolder) {
      const newItems: ExplorerData[] = tree.items
        .map((subTreeItem) => {
          if (subTreeItem.id === id) return null;
          return removeNode(subTreeItem, id);
        })
        .filter(Boolean) as ExplorerData[];
      return { ...tree, items: newItems };
    }
    return tree;
  };
  return { insertNode, removeNode };
}

export default useTraverseTree;
