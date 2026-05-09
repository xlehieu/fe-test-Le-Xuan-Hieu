import { MOCK_TASKS } from '@/mock/task.mock';
import { RootState } from '@/store';
import { Task } from '@/types/task.type';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
interface TasksState {
  items: Task[];
  filters: {
    searchText: string;
    status: ("todo" | "in_progress" | "done")[];
    priority: "low" | "medium" | "high" | "all";
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
    
    return items.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(searchText.toLowerCase()) || 
                           task.description?.toLowerCase().includes(searchText.toLowerCase());
      
      const matchesStatus = status.length === 0 || status.includes(task.status);
      
      const matchesPriority = priority === 'all' || task.priority === priority;
      
      let matchesDate = true;
      if (dateRange && task.dueDate) {
        const taskDate = new Date(task.dueDate).getTime();
        const start = new Date(dateRange[0]).getTime();
        const end = new Date(dateRange[1]).getTime();
        matchesDate = taskDate >= start && taskDate <= end;
      }

      return matchesSearch && matchesStatus && matchesPriority && matchesDate;
    });
  }
);


export const selectPaginatedTasks = createSelector(
  [selectFilteredTasks, selectPagination],
  (filteredTasks, pagination) => {
    const { currentPage, pageSize } = pagination;
    const startIndex = (currentPage - 1) * pageSize;
    return filteredTasks.slice(startIndex, startIndex + pageSize);
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