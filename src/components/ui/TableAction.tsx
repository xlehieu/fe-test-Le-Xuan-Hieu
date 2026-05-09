import { Button, Popconfirm, Space, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import React, { memo } from "react";

type TableActionProps<T> = {
  record: T;
  onClickEdit: (record: T) => void | Promise<void>;
  onClickDelete: (record: T) => void | Promise<void>;
};

const TableAction = <T,>({
  record,
  onClickEdit,
  onClickDelete,
}: TableActionProps<T>) => {
  return (
    <Space size="middle">
      <Tooltip title="Chỉnh sửa">
        <Button
          type="text"
          icon={<EditOutlined className="text-blue-500" />}
          onClick={() => onClickEdit(record)}
          className="hover:bg-blue-50"
        />
      </Tooltip>

      <Tooltip title="Xóa">
        <Popconfirm
          title="Xóa dữ liệu"
          description="Bạn có chắc muốn xóa không?"
          okText="Xóa"
          cancelText="Hủy"
          onConfirm={() => onClickDelete(record)}
        >
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            className="hover:bg-red-50"
          />
        </Popconfirm>
      </Tooltip>
    </Space>
  );
};

TableAction.displayName = "TableAction";

export default memo(TableAction) as typeof TableAction;