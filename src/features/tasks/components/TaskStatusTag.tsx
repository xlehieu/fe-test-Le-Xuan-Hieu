import { memo } from "react";
import { Tag } from "antd";
import { Task } from "@/types/task.type";

interface TaskStatusTagProps {
  status: Task["status"];
}

const statusConfig: Record<
  Task["status"],
  {
    color: string;
    label: string;
  }
> = {
  todo: {
    color: "default",
    label: "TO DO",
  },

  in_progress: {
    color: "processing",
    label: "IN PROGRESS",
  },

  done: {
    color: "success",
    label: "DONE",
  },
};

function TaskStatusTag({
  status,
}: TaskStatusTagProps) {
  const { color, label } =
    statusConfig[status];

  return (
    <Tag
      color={color}
      className="rounded-md border-0 font-medium"
    >
      {label}
    </Tag>
  );
}

TaskStatusTag.displayName = "TaskStatusTag";

export default memo(TaskStatusTag);