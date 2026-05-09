import React, { memo, useEffect, useState } from "react";
import { Modal, Form, Input, Select, DatePicker, message } from "antd";
import dayjs from "dayjs";
import { Task, TaskPayload } from "@/types/task.type";
import { useAppDispatch } from "@/store/hooks";
import { addTask, updateTask } from "../slices/taskSlice"; 
import { delay } from "@/utils/helpers";
import { v7 as uuidv7 } from "uuid";
interface TaskModalProps {
  open: boolean; // Đã mở lại prop này để control Modal chính xác hơn
  onCancel: () => void;
  initialData?: Partial<Task> | null;
}

const TaskModal: React.FC<TaskModalProps> = ({ open, onCancel, initialData }) => {
  const isEdit = !!initialData?.id;
  const [form] = Form.useForm<TaskPayload>();
  const dispatch = useAppDispatch();
  
  // State quản lý hiệu ứng loading khi bấm Lưu
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      if (initialData?.id) {
        form.setFieldsValue({
          ...initialData,
          dueDate: initialData.dueDate ? dayjs(initialData.dueDate) : undefined,
        });
      } else {
        form.resetFields();
        form.setFieldsValue({
          status: "todo",
          priority: "medium",
        });
      }
    }
  }, [open, initialData, form]);

  const onFinish = async (value: TaskPayload) => {
    setIsSubmitting(true);
    await delay(1000)
    try {
      

      if (isEdit && initialData?.id) {
        // Cập nhật: Giữ nguyên ID cũ
        dispatch(
          updateTask({
            id: initialData.id, 
            ...value,
            createdAt:initialData.createdAt!,
            dueDate: value.dueDate ? value.dueDate.toISOString() : undefined,
          })
        );
        message.success("Cập nhật công việc thành công!");
      } else {
        dispatch(
          addTask({
            id: uuidv7(),
            createdAt: dayjs().toISOString(),
            ...value,
            dueDate: value.dueDate ? value.dueDate.toISOString() : undefined,
          })
        );
        message.success("Thêm công việc mới thành công!");
      }
      
      onCancel();
    } catch (error) {
      console.error(error);
      message.error("Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setIsSubmitting(false); // Luôn tắt loading
    }
  };

  return (
    <Modal
      title={isEdit ? "Chỉnh sửa công việc" : "Thêm công việc mới"}
      open={open}
      onOk={() => form.submit()}
      onCancel={onCancel}
      confirmLoading={isSubmitting} // Kích hoạt UI loading
      okText={isEdit ? "Cập nhật" : "Tạo mới"}
      cancelText="Hủy"
      width={600}
      destroyOnClose // Dọn dẹp DOM và state form khi đóng Modal
    >
      <Form form={form} layout="vertical" className="mt-4" onFinish={onFinish}>
        <Form.Item<TaskPayload>
          name="title"
          label="Tiêu đề"
          rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
        >
          <Input placeholder="Nhập tên công việc..." size="large" />
        </Form.Item>

        <Form.Item<TaskPayload> name="description" label="Mô tả chi tiết">
          <Input.TextArea rows={3} placeholder="Mô tả rõ hơn về công việc..." />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item<TaskPayload>
            name="status"
            label="Trạng thái"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
          >
            <Select size="large">
              <Select.Option value="todo">TO DO</Select.Option>
              <Select.Option value="in_progress">IN PROGRESS</Select.Option>
              <Select.Option value="done">DONE</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item<TaskPayload>
            name="priority"
            label="Độ ưu tiên"
            rules={[{ required: true, message: "Vui lòng chọn độ ưu tiên!" }]}
          >
            <Select size="large">
              <Select.Option value="low">Low (Thấp)</Select.Option>
              <Select.Option value="medium">Medium (Trung bình)</Select.Option>
              <Select.Option value="high">High (Cao)</Select.Option>
            </Select>
          </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item<TaskPayload> name="assignee" label="Người được giao">
            <Input placeholder="Nhập tên người thực hiện..." size="large" />
          </Form.Item>

          <Form.Item<TaskPayload> name="dueDate" label="Ngày đến hạn">
            <DatePicker
              className="w-full"
              size="large"
              format="DD/MM/YYYY"
              placeholder="Chọn ngày"
            />
          </Form.Item>
        </div>

        <Form.Item<TaskPayload> name="tags" label="Thẻ (Tags)">
          <Select
            mode="tags"
            size="large"
            placeholder="Gõ tag và ấn Enter..."
            tokenSeparators={[","]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

TaskModal.displayName = "TaskModal";
export default memo(TaskModal);