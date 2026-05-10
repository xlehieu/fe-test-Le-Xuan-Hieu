import TagSelect from "@/components/ui/TagSelect";
import { useOnChangeDebounce } from "@/hooks/useOnChangeDebounce";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Task } from "@/types/task.type";
import {
  ReloadOutlined
} from "@ant-design/icons";
import { Button, Col, DatePicker, Input, Row } from "antd";
import dayjs from "dayjs";
import { taskPriorityOptions, taskStatusOptions } from "../constants/taskConst";
import { resetFilters, setFilter } from "../slices/taskSlice";
const { RangePicker } = DatePicker;

const TaskFilter = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.tasks.filters);

  const hasActiveFilters =
    filters.searchText ||
    (filters.status && filters.status.length > 0) ||
    filters.priority !== "all" ||
    filters.dateRange;

  // SEARCH debounce
  const { value: search, debounced } = useOnChangeDebounce<string>(
    (value) => {
      dispatch(setFilter({ searchText: value }));
    },
    300,
    filters.searchText,
  );

  return (
    <Row gutter={[16, { xs: 16, sm: 16, lg: hasActiveFilters ? 16 : 0 }]}>
      {/* SEARCH */}
      <Col xs={24} md={6}>
        <Input.Search
          placeholder="Tìm kiếm tiêu đề..."
          allowClear
          value={search}
          onChange={(e) => debounced(e.target.value)}
        />
      </Col>

      {/* STATUS */}
      <Col xs={24} md={6}>
        <TagSelect
          mode="multiple"
          placeholder="Trạng thái"
          value={filters.status}
          onChange={(value: Task["status"][]) =>
            dispatch(setFilter({ status: value }))
          }
          options={taskStatusOptions}
          className="w-full"
        />
      </Col>

      {/* PRIORITY */}
      <Col xs={24} md={6}>
        <TagSelect
          placeholder="Độ ưu tiên"
          value={filters.priority}
          onChange={(value: Task["priority"]) =>
            dispatch(setFilter({ priority: value }))
          }
          options={[
            { labelVi: "Tất cả", value: "all" },
            ...taskPriorityOptions,
          ]}
          className="w-full"
        />
      </Col>

      {/* DATE */}
      <Col xs={24} md={6}>
        <RangePicker
          value={
            filters.dateRange
              ? [dayjs(filters.dateRange[0]), dayjs(filters.dateRange[1])]
              : null
          }
          onChange={(dates) =>
            dispatch(
              setFilter({
                dateRange: dates
                  ? [dates[0]!.toISOString(), dates[1]!.toISOString()]
                  : null,
              }),
            )
          }
          className="w-full"
        />
      </Col>

      {/* RESET BUTTON */}
      <Col xs={24} md={6}>
        {hasActiveFilters && (
          <Button
            danger
            onClick={() => dispatch(resetFilters())}
            className="w-full"
          >
            <ReloadOutlined />Đặt lại
          </Button>
        )}
      </Col>
    </Row>
  );
};

export default TaskFilter;
