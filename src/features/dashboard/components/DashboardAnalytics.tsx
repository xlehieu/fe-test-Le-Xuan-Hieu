import { selectTaskStats } from "@/features/tasks/slices/taskSlice";
import { useAppSelector } from "@/store/hooks";
import { Card, Tooltip } from "antd";
import { memo, useMemo } from "react";

const DashboardAnalytics = memo(() => {
  const { total, todo, inProgress, done } = useAppSelector(selectTaskStats);

  // Dùng useMemo để tính toán lại bộ phần trăm chỉ khi các giá trị liên quan thay đổi
  const stats = useMemo(() => {
    const calc = (value: number) => (total > 0 ? (value / total) * 100 : 0);
    
    return {
      todoP: calc(todo),
      progressP: calc(inProgress),
      doneP: calc(done),
    };
  }, [total, todo, inProgress, done]);

  const { todoP, progressP, doneP } = stats;

  return (
    <Card>
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1 w-full">
          <div className="flex justify-between mb-3">
            <h3 className="text-base font-bold text-slate-800">
              Tỷ lệ theo trạng thái
            </h3>
            <span className="text-slate-400 text-sm font-medium">{total} tasks</span>
          </div>

          {/* Progress Bar Container */}
          <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
            <Tooltip title={`Todo: ${todo}`}>
              <div
                style={{ width: `${todoP}%` }}
                className="bg-amber-400 transition-all duration-500 ease-out border-r border-white/20 last:border-0"
              />
            </Tooltip>
            <Tooltip title={`In Progress: ${inProgress}`}>
              <div
                style={{ width: `${progressP}%` }}
                className="bg-cyan-500 transition-all duration-500 ease-out border-r border-white/20 last:border-0"
              />
            </Tooltip>
            <Tooltip title={`Done: ${done}`}>
              <div
                style={{ width: `${doneP}%` }}
                className="bg-emerald-500 transition-all duration-500 ease-out"
              />
            </Tooltip>
          </div>

          {/* Chú thích (Legend) */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <div className="flex flex-col">
                <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">To Do</span>
                <span className="text-base font-bold text-slate-700">{Math.round(todoP)}%</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
              <div className="flex flex-col">
                <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">In progress</span>
                <span className="text-base font-bold text-slate-700">{Math.round(progressP)}%</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <div className="flex flex-col">
                <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">Done</span>
                <span className="text-base font-bold text-slate-700">{Math.round(doneP)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
});

DashboardAnalytics.displayName = "DashboardAnalytics";

export default DashboardAnalytics;