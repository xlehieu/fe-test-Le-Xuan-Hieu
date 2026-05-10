import TableAction from "@/components/ui/TableAction";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Task } from "@/types/task.type";
import { delay } from "@/utils/helpers";
import {
  AppstoreOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  message,
  Popconfirm,
  Table,
  Typography,
  Empty,
  Card,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import dayjs from "dayjs";
import { useCallback, useMemo, useState } from "react";
import TagSelect from "../../../components/ui/TagSelect";
import {
  deleteManyTasks,
  deleteTask,
  selectPaginatedTasks,
  setPage,
  updateTaskStatus,
} from "../slices/taskSlice";
import TaskModal from "./TaskModal";
import TaskPriorityTag from "./TaskPriorityTag";
import { taskStatusOptions } from "../constants/taskConst";
import TaskFilter from "./TaskFilter";

const { Text } = Typography;

const priorityWeight = { low: 1, medium: 2, high: 3 };

const TaskList = () => {
  const { data: taskList, total } = useAppSelector(selectPaginatedTasks);
  const currentPage=useAppSelector(state=>state.tasks.pagination.currentPage)
  const [taskDetail, setTaskDetail] = useState<Partial<Task> | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const handleConfirmDelete = useCallback(
    async (data: Task) => {
      try {
        await delay();
        dispatch(deleteTask(data.id));
        message.success("Xóa task thành công");
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
      setSelectedRowKeys([]);
      message.success(`Xóa ${selectedRowKeys.length} task thành công`);
    } catch (err) {
      message.error("Xóa nhiều task thất bại");
    }
  }, [dispatch, selectedRowKeys]);

  const rowSelection: TableRowSelection<Task> = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      setSelectedRowKeys(newSelectedRowKeys as string[]);
    },
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };

  const columns = useMemo<ColumnsType<Task>>(
    () => [
      {
        title: "Tiêu đề",
        dataIndex: "title",
        key: "title",
        sorter: (a, b) => a.title.localeCompare(b.title),
        width: "30%",
        render: (text) => (
          <Text
            strong
            className="text-slate-700 hover:text-blue-600 transition-colors"
          >
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
          <TagSelect
            options={taskStatusOptions}
            value={status}
            size="middle"
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
          />
        ),
      },
      {
        title: "Độ ưu tiên",
        dataIndex: "priority",
        key: "priority",
        width: 130,
        sorter: (a, b) =>
          priorityWeight[a.priority] - priorityWeight[b.priority],
        render: (priority: Task["priority"]) => (
          <TaskPriorityTag priority={priority} />
        ),
      },
      {
        title: <span className="whitespace-nowrap">Người được giao</span>,
        dataIndex: "assignee",
        key: "assignee",
        width: 180,
        ellipsis: false,
        render: (assignee) => (
          <Text
            className={`whitespace-nowrap ${
              assignee
                ? "text-emerald-600 font-medium"
                : "text-slate-400 italic"
            }`}
          >
            {assignee || "Chưa giao"}
          </Text>
        ),
      },
      {
        title: <span className="whitespace-nowrap">Hạn chót</span>,
        dataIndex: "dueDate",
        key: "dueDate",
        width: 150,
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
                isOverdue
                  ? "text-red-600 font-semibold bg-red-50 px-2 py-1 rounded"
                  : "text-slate-600"
              }
            >
              {dayjs(dueDate).format("DD/MM/YYYY")}
            </Text>
          );
        },
      },
      {
        title: (
          <div className="flex justify-center">
            <AppstoreOutlined style={{fontSize:18}}/>
          </div>
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
    <div className="space-y-5">
      {/* Header */}
      <div className="shadow-sm border-slate-200/60">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Filter Section */}
          <div className="flex-1 w-full">
            <TaskFilter />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto shrink-0">
            <Button
              type="primary"
              className="w-full sm:w-auto"
              onClick={() => {
                setTaskDetail({});
              }}
              icon={<PlusOutlined />}
            >
              Thêm Task
            </Button>

            {selectedRowKeys.length > 0 && (
              <Popconfirm
                title="Xóa dữ liệu"
                description={`Bạn có chắc muốn xóa ${selectedRowKeys.length} task này không?`}
                okText="Xóa"
                okType="danger"
                cancelText="Hủy"
                onConfirm={handleDeleteSelected}
              >
                <Button
                  danger
                  className="w-full sm:w-auto"
                  icon={<DeleteOutlined />}
                >
                  Xóa {selectedRowKeys.length}
                </Button>
              </Popconfirm>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200/60 dark:bg-[var(--bg-dark)] dark:border-slate-900 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
        <Table
          columns={columns}
          dataSource={taskList}
          rowSelection={rowSelection}
          rowKey="id"
          pagination={{
            pageSize: 10,
            total,
            current:currentPage,
            showTotal: (total) => (
              <span className="text-sm font-medium text-slate-500">
                Hiển thị {Math.min(10, total)} / {total} bản ghi
              </span>
            ),
            onChange(page) {
              dispatch(setPage(page));
            },
            showSizeChanger: false,
            align: "center",
          }}
          scroll={{ x: 900 }}
          className="custom-task-table"
          locale={{
            emptyText: (
              <Empty description="Không có công việc nào" className="py-8" />
            ),
          }}
          style={{
            borderRadius: "0.75rem",
          }}
        />
      </div>

      {/* Task Modal */}
      <TaskModal
        initialData={taskDetail}
        open={!!taskDetail}
        onCancel={handleCancelModal}
      />
    </div>
  );
};

export default TaskList;
