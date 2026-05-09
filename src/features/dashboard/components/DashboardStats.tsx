import { selectTaskStats } from "@/features/tasks/taskSlice";
import { useAppSelector } from "@/store/hooks";
import { Card, Statistic, Row, Col } from "antd";
import {
  LayoutGrid,
  ClipboardList,
  RefreshCcw,
  CheckCircle2,
} from "lucide-react";
import { memo } from "react";

const DashboardStats= memo(()=> {
  const { total, todo, inProgress, done } = useAppSelector(selectTaskStats);

  const statsConfig = [
    {
      title: "Tổng tasks",
      value: total,
      icon: <LayoutGrid size={22} color="#fff" />,
      className: "bg-gradient-to-r from-blue-500 to-blue-300 shadow-blue-500/30",
    },
    {
      title: "Todo",
      value: todo,
      icon: <ClipboardList size={22} color="#fff" />,
      className:
        "bg-gradient-to-r from-amber-500 to-yellow-300 shadow-amber-500/30",
    },
    {
      title: "In progress",
      value: inProgress,
      icon: (
        <RefreshCcw size={22} color="#fff" className="animate-spin-slow" />
      ),
      className: "bg-gradient-to-r from-cyan-600 to-cyan-300 shadow-cyan-600/30",
    },
    {
      title: "Done",
      value: done,
      icon: <CheckCircle2 size={22} color="#fff" />,
      className:
        "bg-gradient-to-r from-emerald-500 to-green-300 shadow-emerald-500/30",
    },
  ];

  return (
    <div>
      <Row gutter={[24, 24]}>
        {statsConfig.map((item, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card
              className={`
                relative overflow-hidden rounded-2xl
                text-white cursor-pointer
                transition-all duration-300 ease-in-out
                hover:-translate-y-2 hover:scale-[1.02]
                active:scale-95
                ${item.className}
              `}
            >
              {/* circle decor */}
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10 pointer-events-none" />

              {/* header */}
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 mr-3">
                  {item.icon}
                </div>

                <span className="text-sm font-semibold tracking-wide">
                  {item.title}
                </span>
              </div>

              {/* value */}
              <Statistic
                value={item.value}
                valueStyle={{
                  fontSize: "32px",
                  fontWeight: 800,
                  color: "#fff",
                  textShadow: "0 2px 4px rgba(0,0,0,0.15)",
                }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* animation only */}
      <style>{`
        .animate-spin-slow {
          animation: spin 4s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
})
DashboardStats.displayName="DashboardStats"
export default DashboardStats