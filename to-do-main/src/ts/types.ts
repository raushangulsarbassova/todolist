export type Status = "To do" | "Done" | "Trash";

export type ITask = {
  id: string;
  title: string;
  status: Status;
};
