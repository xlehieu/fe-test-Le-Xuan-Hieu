import { TagConfig } from "@/types/common.type";
import { Task } from "@/types/task.type";

export const taskPriorityOptions: TagConfig<Task["priority"]>[] = [
  {
    value: "low",
    color: "success",
    label: "Low",
    labelVi: "Thấp",
  },
  {
    value: "medium",
    color: "warning",
    label: "Medium",
    labelVi: "Trung bình",
  },
  {
    value: "high",
    color: "error",
    label: "High",
    labelVi: "Cao",
  },
];

export const taskPriorityMap: Record<
  Task["priority"],
  TagConfig<Task["priority"]>
> = {
  low: taskPriorityOptions[0],
  medium: taskPriorityOptions[1],
  high: taskPriorityOptions[2],
};


export const taskStatusOptions: TagConfig<Task["status"]>[] = [
  {
    value: "todo",
    color: "default",
    label: "Todo",
    labelVi: "Cần làm",
  },
  {
    value: "in_progress",
    color: "processing",
    label: "In progress",
    labelVi: "Đang thực hiện",
  },
  {
    value: "done",
    color: "success",
    label: "Done",
    labelVi: "Hoàn thành",
  },
];

export const taskStatusMap: Record<
  Task["status"],
  TagConfig<Task["status"]>
> = {
  todo: taskStatusOptions[0],
  in_progress: taskStatusOptions[1],
  done: taskStatusOptions[2],
};