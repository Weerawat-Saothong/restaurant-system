"use client";

import { ConfigProvider, theme } from "antd";
import { observer } from "mobx-react";
import { NextPage } from "next";
import { ReactNode, useEffect } from "react";
import themeViewModel from "./them.viewmodel";

interface Props {
  children: ReactNode;
}

const ThemeProvider: NextPage<Props> = ({ children }) => {
  const { isDarkMode, isReady } = themeViewModel;
  const { defaultAlgorithm, darkAlgorithm } = theme;

  useEffect(() => {
    themeViewModel.initMode();
    return () => {};
  }, []);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        token: {
          colorPrimary: "#FED06E",
          colorLink: "#FFCC2A",
          // colorPrimaryBg: isDarkMode ? "#162312" : "#F6FFED",
          // borderRadius: 0,
        },
      }}
    >
      {isReady && children}
    </ConfigProvider>
  );
};

export default observer(ThemeProvider);
