import { Button, Tooltip } from "antd";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import { useTheme } from "@/providers/ThemeProvider";

export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Tooltip title={isDark ? "Light Mode" : "Dark Mode"}>
      <Button
        type="text"
        size="large"
        icon={isDark ? <SunOutlined /> : <MoonOutlined />}
        onClick={toggleTheme}
        className="rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      />
    </Tooltip>
  );
};

export default ThemeToggle;