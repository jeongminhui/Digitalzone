import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Header from "./Header/Header";
import MenuTab from "./MenuTab/MenuTab";
import Globalstyle from "../style/Globalstyle";
import { darkTheme, lightTheme } from "../style/theme";

const Root = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Globalstyle />
      <div className="Root">
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <div className="Root_layoutWrap">
          <MenuTab />
          <Outlet />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Root;
