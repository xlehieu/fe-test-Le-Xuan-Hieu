import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout/index";
import NotFoundPage from "@/pages/NotFound";
import DashboardPage from "@/features/dashboard/DashboardPage";
import TasksPage from "@/features/tasks/TasksPage";
import { ROUTE } from "./route.config";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, 
    children: [
      {
        index: true, 
        element: <Navigate to={ROUTE.DASHBOARD} replace />,
      },
      {
        path: ROUTE.DASHBOARD,
        element: <DashboardPage />,
      },
      {
        path: ROUTE.TASKS,
        element: <TasksPage />, 
      },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
