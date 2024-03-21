export type ListProps = {
  onSelect: (value: ListEntry) => void;
  searchString: string;
  valueSet: Set<string>;
};
export type UserType = {
  firstName: string;
  lastName: string;
  id: string;
};
export type ListEntry = { label: string; value: string };
