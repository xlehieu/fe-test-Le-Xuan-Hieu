import { TagConfig } from "@/types/common.type";
import { Task } from "@/types/task.type";

export const taskPriorityConfig: Record<
  Task["priority"],
  TagConfig
> = {
  low: {
    color: "success",
    label: "Low",
    labelVi:"Thấp"
  },
  medium: {
    color: "warning",
    label: "Medium",
    labelVi:"Trung bình"
  },
  high: {
    color: "error",
    label: "High",
    labelVi:"Cao"
  },
};
export const taskStatusConfig: Record<
  Task["status"],
  TagConfig
> = {
  todo: {
    color: "default",
    label: "Todo",
    labelVi: "Cần làm",
  },

  in_progress: {
    color: "processing",
    label: "In progress",
    labelVi: "Đang thực hiện",
  },

  done: {
    color: "success",
    label: "Done",
    labelVi: "Hoàn thành",
  },
};