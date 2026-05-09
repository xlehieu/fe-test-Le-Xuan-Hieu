import type { MenuProps } from "antd";
import { Button, Drawer, Layout, Menu } from "antd";
import {
  BellOutlined,
  CalendarOutlined,
  CloseOutlined,
  DashboardOutlined,
  MenuOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";

import { useMemo, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

import { ROUTE } from "@/routes/route.config";

const { Header, Sider, Content } = Layout;

const sidebarItems = [
  {
    title: "Dashboard",
    href: ROUTE.DASHBOARD,
    icon: <DashboardOutlined style={{ fontSize: 20 }} />,
  },
  {
    title: "Tasks",
    href: ROUTE.TASKS,
    icon: <CalendarOutlined style={{ fontSize: 20 }} />,
  },
];

function AdminDashboardLayout() {
  const location = useLocation();
  const pathname = location.pathname;

  const [collapsed, setCollapsed] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);

  const menuItems: MenuProps["items"] = sidebarItems.map((item) => ({
    key: item.href,
    icon: item.icon,
    label: (
      <Link to={item.href} onClick={() => setOpenMobile(false)}>
        {item.title}
      </Link>
    ),
  }));

  const title = useMemo(() => {
    return sidebarItems.find((item) => item.href === pathname)?.title || "";
  }, [pathname]);

  return (
    <Layout className="min-h-screen bg-[#f5f7fb]">
      {/* Desktop */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={260}
        collapsedWidth={80}
        className="hidden lg:block bg-white shadow-sm sticky top-0 h-screen"
      >
        <div className="h-16 flex items-center justify-center px-5 font-bold text-indigo-600 transition-all duration-300">
          {collapsed ? (
            <div className="p-2 bg-indigo-50 rounded-lg">FE</div>
          ) : (
            "FE TEST | LÊ XUÂN HIẾU"
          )}
        </div>

        <Menu
          mode="inline"
          selectedKeys={[pathname]}
          items={menuItems}
          className="border-0 px-2"
        />
      </Sider>

      {/* Mobile */}
      <Drawer
        placement="left"
        onClose={() => setOpenMobile(false)}
        open={openMobile}
        width={280}
        closable={false}
        styles={{ body: { padding: 0 } }}
      >
        <div className="h-16 flex items-center justify-between px-5 border-b font-bold text-indigo-600">
          <span>FE TEST | LÊ XUÂN HIẾU</span>

          <Button type="text" onClick={() => setOpenMobile(false)}>
            <CloseOutlined />
          </Button>
        </div>

        <Menu
          mode="inline"
          selectedKeys={[pathname]}
          items={menuItems}
          className="border-0 p-2"
        />
      </Drawer>

      <Layout>
        <Header className="flex items-center justify-between bg-white/80 backdrop-blur border-b px-4 lg:px-6 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <Button
              type="text"
              onClick={() => setOpenMobile(true)}
              className="lg:hidden flex items-center justify-center h-10 w-10 rounded-xl hover:bg-gray-100"
            >
              <MenuOutlined className="text-lg text-gray-700" />
            </Button>

            <Button
              type="text"
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex items-center justify-center h-10 w-10 px-2 rounded-xl hover:bg-gray-100"
            >
              {collapsed ? <RightOutlined /> : <LeftOutlined />}
            </Button>

            <h2 className="text-lg font-bold text-gray-800 ml-2">
              {title}
            </h2>
          </div>

        </Header>

        <Content className="p-4 lg:p-6 bg-[#f5f7fb]">
          <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 min-h-[calc(100vh-112px)]">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminDashboardLayout;