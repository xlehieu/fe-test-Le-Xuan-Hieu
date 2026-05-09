import TableAction from "@/components/ui/TableAction";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Task } from "@/types/task.type";
import { delay } from "@/utils/helpers";
import { AppstoreOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, message, Popconfirm, Select, Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import dayjs from "dayjs";
import { useCallback, useMemo, useState } from "react";
import {
  deleteManyTasks,
  deleteTask,
  selectPaginatedTasks,
  setPage,
  updateTaskStatus
} from "../slices/taskSlice";
import TaskModal from "./TaskModal";
import TaskPriorityTag from "./TaskPriorityTag";
import TaskStatusTag from "./TaskStatusTag";

const { Text } = Typography;

// Map trọng số để sort cột Priority
const priorityWeight = { low: 1, medium: 2, high: 3 };

const TaskList = () => {
  // khúc này cho em xin phép đặt cả total nữa ạ cho giống api thật ạ
  // hiển thị ở table cũng dễ hơn ạ
  const { data: taskList, total } = useAppSelector(selectPaginatedTasks);
  const [taskDetail, setTaskDetail] = useState<Partial<Task> | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const handleConfirmDelete = useCallback(
    async (data: Task) => {
      try {
        await delay();
        dispatch(deleteTask(data.id));
      } catch (err) {
        message.error("Xóa thất bại");
      }
    },
    [dispatch],
  );
  const handleDeleteSelected = useCallback(async () => {
    try {
      await delay();
      dispatch(deleteManyTasks(selectedRowKeys));
    } catch (err) {
      message.error("Xóa nhiều task thất bại");
    }
  }, [dispatch, selectedRowKeys]);
  const rowSelection: TableRowSelection<Task> = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      setSelectedRowKeys(newSelectedRowKeys as string[]);
    },
    selections: true,
  };
  //region config columns
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
        width: 180,

        render: (status: Task["status"], record) => (
          <Select
            value={status}
            size="small"
            className="w-full"
            onChange={(value: Task["status"]) => {
              try {
                dispatch(
                  updateTaskStatus({
                    id: record.id,
                    status: value,
                  }),
                );
                message.success("Cập nhật trạng thái thành công");
              } catch (err) {}
            }}
            options={[
              {
                value: "todo",
                label: <TaskStatusTag status="todo" />,
              },
              {
                value: "in_progress",
                label: <TaskStatusTag status="in_progress" />,
              },
              {
                value: "done",
                label: <TaskStatusTag status="done" />,
              },
            ]}
          />
        ),
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
        title: "Hạn chót",
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
            onClickEdit={(data) => {
              setTaskDetail(data);
            }}
            onConfirmDelete={handleConfirmDelete}
          />
        ),
      },
    ],
    [setTaskDetail, handleConfirmDelete],
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
        <div className="flex gap-2">
          {selectedRowKeys.length > 0 && (
            <Popconfirm
              title="Xóa dữ liệu"
              description="Bạn có chắc muốn xóa không?"
              okText="Xóa"
              cancelText="Hủy"
              onConfirm={handleDeleteSelected}
            >
              <Button danger>Xóa {selectedRowKeys.length} task</Button>
            </Popconfirm>
          )}

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
      </div>

      <Table
        columns={columns}
        dataSource={taskList}
        rowSelection={rowSelection}
        rowKey="id"
        // Cấu hình phân trang theo yêu cầu
        pagination={{
          pageSize: 10,
          total,
          showTotal: (total) => (
            <span className="font-medium text-slate-500">
              Tổng số: {total} bản ghi
            </span>
          ),
          onChange(page) {
            dispatch(setPage(page));
          },
          showSizeChanger: false,
        }}
        scroll={{ x: 800 }}
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
