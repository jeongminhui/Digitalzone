import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import MenuTab from "./MenuTab/MenuTab";

const Root = () => {
  return (
    <div>
      <Header />
      <div className="RootContainer">
        <MenuTab />
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
