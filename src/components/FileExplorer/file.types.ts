export type ExplorerData = {
  id: string;
  name: string;
  isFolder: boolean;
  items: ExplorerData[];
};

export type Type = "folder" | "file";

export type InsertNode = (
  tree: ExplorerData,
  id: string,
  isFolder: boolean,
  name: string
) => ExplorerData;

export type AddNode = (id: string, isFolder: boolean, name: string) => void;
export type RemoveNode = (tree: ExplorerData, id: string) => ExplorerData;
export type RemoveNodeHandler = (id: string) => void;
