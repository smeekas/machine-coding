import { ExplorerData } from "./file.types";

export const dummyData: ExplorerData = {
  id: "1",
  isFolder: true,
  name: "src",
  items: [
    {
      id: "2",
      isFolder: true,
      name: "utils",
      items: [
        {
          id: "3",
          isFolder: false,
          name: "api.ts",
          items: [],
        },
      ],
    },
    {
      id: "4",
      isFolder: false,
      items: [],
      name: "main.tsx",
    },
  ],
};
