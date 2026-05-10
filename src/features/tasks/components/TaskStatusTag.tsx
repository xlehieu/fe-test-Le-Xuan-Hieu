import { memo } from "react";
import { Tag } from "antd";
import { Task } from "@/types/task.type";
import { taskStatusMap } from "../constants/taskConst";

interface TaskStatusTagProps {
  status: Task["status"];
}
function TaskStatusTag({ status }: TaskStatusTagProps) {
  const { color, label, labelVi } = taskStatusMap[status];

  return (
    <Tag color={color} className="rounded-md border-0 font-medium">
      {labelVi}
    </Tag>
  );
}

TaskStatusTag.displayName = "TaskStatusTag";

export default memo(TaskStatusTag);
