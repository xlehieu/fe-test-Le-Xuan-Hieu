import { ConfigProvider, theme } from "antd";
import React from "react";
import viVN from "antd/es/locale/vi_VN";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import "dayjs/locale/vi";

dayjs.extend(updateLocale);

//chủ nhật xuống cuối
dayjs.updateLocale("vi", {
  weekStart: 1,
});

dayjs.locale("vi");
const AntProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConfigProvider
      locale={viVN}
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: "#4f46e5",
          borderRadius: 10,
        },
        components: {
          Table: {
            headerBg: "#eaeaea",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AntProvider;
