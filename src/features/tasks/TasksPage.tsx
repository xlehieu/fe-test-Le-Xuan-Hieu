import TaskFilter from "./components/TaskFilter";
import TaskList from "./components/TasksList";

const TasksPage = () => {
  return (
    <div className="space-y-4">
      
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">
          Danh sách công việc
        </h2>
      

      <TaskList />
    </div>
  );
};

export default TasksPage;
