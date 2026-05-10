import { MOCK_TASKS } from '@/mock/task.mock';
import { RootState } from '@/store';
import { Task } from '@/types/task.type';
import { normalizeText } from '@/utils/helpers';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);
interface TasksState {
  items: Task[];
  filters: {
    searchText: string;
    status: Task["status"][];
    priority: Task["priority"] | "all";
    dateRange: [string, string] | null;
  };
  pagination: {
    currentPage: number;
    pageSize: number;
  };
}

const initialState: TasksState = {
  items: [...MOCK_TASKS],
  filters: {
    searchText: '',
    status: [],
    priority: 'all',
    dateRange: null,
  },
  pagination: {
    currentPage: 1,
    pageSize: 10,
  },
};

// 3. Slice
export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.items.unshift(action.payload); // Thêm vào đầu danh sách
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.items.findIndex(t => t.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(t => t.id !== action.payload);
    },
    deleteManyTasks: (state, action: PayloadAction<string[]>) => {
      state.items = state.items.filter(t => !action.payload.includes(t.id));
    },
    updateTaskStatus: (state, action: PayloadAction<{ id: string; status: Task['status'] }>) => {
      const task = state.items.find(t => t.id === action.payload.id);
      if (task) task.status = action.payload.status;
    },
    setFilter: (state, action: PayloadAction<Partial<TasksState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.currentPage = 1; // Reset về trang 1 khi lọc
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.pagination.currentPage = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
    },
  },
});

const selectTasksState = (state: RootState) => state.tasks;

export const selectAllTasks = createSelector(
  [selectTasksState],
  (tasksState) => tasksState.items
);

const selectFilters = (state: RootState) => state.tasks.filters;
const selectPagination = (state: RootState) => state.tasks.pagination;


export const selectFilteredTasks = createSelector(
  [selectAllTasks, selectFilters],
  (items, filters) => {
    const { searchText, status, priority, dateRange } = filters;

    const normalizedSearch = normalizeText(searchText);

    return items.filter((task) => {
      const title = normalizeText(task.title);
      const description = normalizeText(task.description || "");

      const matchesSearch =
        title.includes(normalizedSearch) ||
        description.includes(normalizedSearch);

      const matchesStatus =
        status.length === 0 || status.includes(task.status);

      const matchesPriority =
        priority === "all" || task.priority === priority;

      let matchesDate = true;
      if (dateRange) {
        // Nếu có filter date, bắt buộc phải có dueDate
        if (!task.dueDate) {
          console.log("OK")
          matchesDate = false;
        } else {
          const taskDate = dayjs(task.dueDate);
          const start = dayjs(dateRange[0]);
          const end = dayjs(dateRange[1]);
          matchesDate = taskDate.isBetween(start, end, null, "[]");
        }
      }

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesDate
      );
    });
  }
);


export const selectPaginatedTasks = createSelector(
  [selectFilteredTasks, selectPagination],
  (filteredTasks, pagination) => {
    const { currentPage, pageSize } = pagination;

    const startIndex = (currentPage - 1) * pageSize;

    // khúc này cho em xin phép đặt cả total nữa ạ cho giống api thật ạ
    // hiển thị ở table cũng dễ hơn ạ
    return {
      data: filteredTasks.slice(startIndex, startIndex + pageSize),
      total: filteredTasks.length,
      currentPage,
      pageSize,
    };
  }
);

// Dashboard
export const selectTaskStats = createSelector(
  [selectAllTasks],
  (items) => {
    return items.reduce(
      (acc, task) => {
        acc.total++;
        if (task.status === 'todo') acc.todo++;
        else if (task.status === 'in_progress') acc.inProgress++;
        else if (task.status === 'done') acc.done++;
        return acc;
      },
      { total: 0, todo: 0, inProgress: 0, done: 0 }
    );
  }
);
export const selectLatestTasks = createSelector(
  [selectAllTasks],
  (items) => {
    return [...items]
      .sort((a, b) => {
        // lấy timestamp
        const dateA = dayjs(a.createdAt).valueOf();
        const dateB = dayjs(b.createdAt).valueOf();
        // Sắp xếp giảm dần (mới nhất lên đầu)
        return dateB - dateA;
      })
      .slice(0, 5);
  }
);
export const { 
  addTask, updateTask, deleteTask, deleteManyTasks, 
  updateTaskStatus, setFilter, resetFilters, setPage 
} = tasksSlice.actions;

const taskReducer= tasksSlice.reducer;
export default taskReducer