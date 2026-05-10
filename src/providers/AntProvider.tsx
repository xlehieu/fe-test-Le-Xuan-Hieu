import { ConfigProvider, theme } from "antd";
import React from "react";
import viVN from "antd/es/locale/vi_VN";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import "dayjs/locale/vi";
import { useTheme } from "./ThemeProvider";

dayjs.extend(updateLocale);

//chủ nhật xuống cuối
dayjs.updateLocale("vi", {
  weekStart: 1,
});

dayjs.locale("vi");
const bgDarkColor = "#141414"
const AntProvider = ({ children }: { children: React.ReactNode }) => {
  const { isDark } = useTheme();
  return (
    <ConfigProvider
      locale={viVN}
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: "#4f46e5",
          borderRadius: 10,
        },
        components: {
          Table: {
            headerBg: !isDark ?"#eaeaea":undefined,
            colorBgContainer: isDark ? bgDarkColor : undefined,
          },
          Layout:{
            bodyBg: isDark?bgDarkColor:undefined
          },
        },
      }}
    >
      <div className={isDark ? "dark" : ""}>{children}</div>
    </ConfigProvider>
  );
};

export default AntProvider;
