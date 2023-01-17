import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Header from "./Header/Header";
import MenuTab from "./MenuTab/MenuTab";
import Globalstyle from "../style/Globalstyle";
import { darkTheme, lightTheme } from "../style/theme";
import { ThemeContext } from "./Context/ThemeContext";

const Root = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("mode") === "true" ? true : false
  );

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    localStorage.setItem("mode", String(!isDarkMode));
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <Globalstyle />
        <div className="Root">
          <Header />
          <div className="Root_layoutWrap">
            <MenuTab />
            <Outlet />
          </div>
        </div>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default Root;
