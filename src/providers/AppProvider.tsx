import { store } from "@/store";
import React from "react";
import { Provider } from "react-redux";
import AntProvider from "./AntProvider";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <AntProvider>{children}</AntProvider>
    </Provider>
  );
};

export default AppProvider;
