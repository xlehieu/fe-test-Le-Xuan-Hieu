import { selectLatestTasks } from "@/features/tasks/slices/taskSlice";
import { useAppSelector } from "@/store/hooks";
import { Task } from "@/types/task.type";
import {
  CalendarOutlined
} from "@ant-design/icons";
import { Card, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { memo, useMemo } from "react";

// Kích hoạt plugin hiển thị thời gian tương đối (ví dụ: 5 phút trước)
dayjs.extend(relativeTime);

const { Text } = Typography;

const DashboardLatestTask = memo(() => {
  const latestTasks = useAppSelector(selectLatestTasks);

  const columns = useMemo<ColumnsType<Task>>(
    () => [
      {
        title: "Task",
        dataIndex: "title",
        key: "title",
        render: (text) => (
          <Text strong className="text-slate-700">
            {text}
          </Text>
        ),
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
        width: 120,
        render: (status: Task["status"]) => {
          let color = "blue";
          let label = status.toUpperCase().replace("_", " ");

          if (status === "todo") color = "gold";
          if (status === "in_progress") color = "cyan";
          if (status === "done") color = "green";

          return (
            <Tag color={color} className="rounded-full px-3 font-medium">
              {label}
            </Tag>
          );
        },
      },
      {
        title: "Thời gian tạo",
        dataIndex: "createdAt",
        key: "createdAt",
        responsive: ["md"],
        render: (time) => (
          <Text type="secondary" className="text-xs">
            {dayjs(time).fromNow()}
          </Text>
        ),
      },
    ],
    [],
  );

  return (
    <Card
      title={
        <div className="flex items-center gap-2">
          <CalendarOutlined className="text-blue-500" />
          <span>5 tasks mới nhất</span>
        </div>
      }
    >
      <Table
        columns={columns}
        dataSource={latestTasks}
        rowKey="id"
        pagination={false} // Vì chỉ lấy 5 cái nên không cần phân trang
        size="middle"
        scroll={{ x: 400 }}
        className="custom-table"
      />
    </Card>
  );
});
DashboardLatestTask.displayName="DashboardLatestTask"
export default DashboardLatestTask;
