import React, { memo } from "react";
import { Tag } from "antd";
import { Task } from "@/types/task.type";

interface TaskPriorityTagProps {
  priority: Task["priority"];
}

const priorityConfig: Record<
  Task["priority"],
  {
    color: string;
    label: string;
  }
> = {
  low: {
    color: "success",
    label: "Low",
  },
  medium: {
    color: "warning",
    label: "Medium",
  },
  high: {
    color: "error",
    label: "High",
  },
};

function TaskPriorityTag({
  priority,
}: TaskPriorityTagProps) {
  const { color, label } =
    priorityConfig[priority];

  return (
    <Tag
      color={color}
      className="rounded-full px-3 capitalize font-semibold"
    >
      {label}
    </Tag>
  );
}

TaskPriorityTag.displayName = "TaskPriorityTag";

export default memo(TaskPriorityTag);