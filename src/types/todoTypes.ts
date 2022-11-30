//Core Categories
export enum Category {
  TODO = "TODO",
  DOING = "DOING",
  DONE = "DONE",
}

export type TodoItem = {
  id: string;
  title: string;
  description: string;
};

//Strcuture of global state
export type TodoStateType = {
  selectedItem: string | null;
  draggedItem: string | null;
  [Category.TODO]: TodoItem[];
  [Category.DOING]: TodoItem[];
  [Category.DONE]: TodoItem[];
};
