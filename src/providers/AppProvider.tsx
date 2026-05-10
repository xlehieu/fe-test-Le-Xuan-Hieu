import { store } from "@/store";
import React from "react";
import { Provider } from "react-redux";
import AntProvider from "./AntProvider";
import { ThemeProvider } from "./ThemeProvider";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AntProvider>{children}</AntProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default AppProvider;
