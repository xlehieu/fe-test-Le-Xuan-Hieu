import React, { memo } from "react";
import { Tag } from "antd";
import { Task } from "@/types/task.type";
import { taskPriorityMap } from "../constants/taskConst";

interface TaskPriorityTagProps {
  priority: Task["priority"];
}



function TaskPriorityTag({
  priority,
}: TaskPriorityTagProps) {
  const { color, label,labelVi } = taskPriorityMap[priority];

  return (
    <Tag
      color={color}
      className="rounded-full px-3 capitalize font-semibold"
    >
      {labelVi}
    </Tag>
  );
}

TaskPriorityTag.displayName = "TaskPriorityTag";

export default memo(TaskPriorityTag);