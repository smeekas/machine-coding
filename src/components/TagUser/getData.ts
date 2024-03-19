const data = ["parth", "jagdish", "kaushal", "kp", "keyur", "paro", "jaggi"];
export const getData = (text: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data.filter((dataItem) => dataItem.includes(text)) as string[]);
    }, 200);
  });
};
