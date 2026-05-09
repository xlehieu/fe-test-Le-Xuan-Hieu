import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./store";
import { Provider } from "react-redux";
import { ConfigProvider, theme } from "antd";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          algorithm: theme.defaultAlgorithm,
          token: {
            colorPrimary: "#4f46e5",
            borderRadius: 10,
          },
          components:{
            Table:{
              headerBg:"#eaeaea"
            }
          }
        }}
      >
        <App />
      </ConfigProvider>
    </Provider>
  </StrictMode>,
);
