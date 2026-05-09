import { useAppSelector } from "@/store/hooks";
import { Task } from "@/types/task.type";
import { Button, Space, Table, Tag, Tooltip, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import {
  AppstoreOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useCallback, useMemo, useState } from "react";
import { selectAllTasks } from "../slices/taskSlice";
import TaskModal from "./TaskModal";
import TaskPriorityTag from "./TaskPriorityTag";
import TaskStatusTag from "./TaskStatusTag";
import TableAction from "@/components/ui/TableAction";

const { Text } = Typography;

// Map trọng số để sort cột Priority
const priorityWeight = { low: 1, medium: 2, high: 3 };

const TaskList = () => {
  const tasks = useAppSelector(selectAllTasks);
  const [taskDetail, setTaskDetail] = useState<Partial<Task> | null>(null);

  const columns = useMemo<ColumnsType<Task>>(
    () => [
      {
        title: "Tiêu đề",
        dataIndex: "title",
        key: "title",
        // Sort theo thứ tự chữ cái của Tiêu đề
        sorter: (a, b) => a.title.localeCompare(b.title),
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
        width: 130,
        render: (status: Task["status"]) => <TaskStatusTag status={status} />,
      },
      {
        title: "Độ ưu tiên",
        dataIndex: "priority",
        key: "priority",
        width: 120,
        // Sort theo trọng số quy định (low -> medium -> high)
        sorter: (a, b) =>
          priorityWeight[a.priority] - priorityWeight[b.priority],
        render: (priority: Task["priority"]) => (
          <TaskPriorityTag priority={priority} />
        ),
      },
      {
        title: "Người được giao",
        dataIndex: "assignee",
        key: "assignee",
        width: 160,
        render: (assignee) => (
          <Text
            className={assignee ? "text-slate-600" : "text-slate-400 italic"}
          >
            {assignee || "Chưa giao"}
          </Text>
        ),
      },
      {
        title: "Ngày đến hạn",
        dataIndex: "dueDate",
        key: "dueDate",
        width: 150,
        // Sort theo thời gian
        sorter: (a, b) => {
          const dateA = a.dueDate ? dayjs(a.dueDate).valueOf() : 0;
          const dateB = b.dueDate ? dayjs(b.dueDate).valueOf() : 0;
          return dateA - dateB;
        },
        render: (dueDate) => {
          if (!dueDate) return <Text type="secondary">-</Text>;

          const isOverdue = dayjs(dueDate).isBefore(dayjs(), "day");
          return (
            <Text
              className={
                isOverdue ? "text-red-500 font-medium" : "text-slate-600"
              }
            >
              {dayjs(dueDate).format("DD/MM/YYYY")}
            </Text>
          );
        },
      },
      {
        title: (
          <>
            <div className="flex justify-center">
              <AppstoreOutlined />
            </div>
          </>
        ),
        key: "actions",
        width: 120,
        align: "center",
        render: (_, record) => (
          <TableAction
            record={record}
            onClickEdit={() => {}}
            onClickDelete={() => {}}
          />
        ),
      },
    ],
    [setTaskDetail],
  );
  const handleCancelModal = useCallback(() => {
    setTaskDetail(null);
  }, []);
  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800">
          Danh sách công việc
        </h2>
        {/* Nút Thêm mới nếu cần */}
        <Button
          type="primary"
          className="rounded-lg"
          onClick={() => {
            setTaskDetail({});
          }}
        >
          <PlusOutlined /> Thêm Task
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={tasks}
        rowKey="id"
        // Cấu hình phân trang theo yêu cầu
        pagination={{
          pageSize: 10,
          showTotal: (total) => (
            <span className="font-medium text-slate-500">
              Tổng số: {total} bản ghi
            </span>
          ),
          showSizeChanger: false, // Tắt chức năng chọn số item/trang nếu chỉ fix cứng 10
        }}
        scroll={{ x: 800 }} // Đảm bảo không vỡ layout trên mobile
        className="custom-table"
      />
      <TaskModal
        initialData={taskDetail}
        open={!!taskDetail}
        onCancel={handleCancelModal}
      />
    </>
  );
};

export default TaskList;
