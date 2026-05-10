import { Button, DatePicker, Input, Row, Col } from "antd";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setFilter, resetFilters } from "../slices/taskSlice";
import { useOnChangeDebounce } from "@/hooks/useOnChangeDebounce";
import dayjs from "dayjs";
import { taskPriorityOptions, taskStatusOptions } from "../constants/taskConst";
import TagSelect from "@/components/ui/TagSelect";
import { Task } from "@/types/task.type";

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
      <Col xs={24} sm={24} md={6} lg={8}>
        {hasActiveFilters && (
          <Button
            danger
            onClick={() => dispatch(resetFilters())}
            className="w-full"
          >
            Đặt lại
          </Button>
        )}
      </Col>
    </Row>
  );
};

export default TaskFilter;
