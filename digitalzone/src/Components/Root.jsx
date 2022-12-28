import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import MenuTab from "./MenuTab/MenuTab";

const Root = () => {
  return (
    <div className="Root">
      <Header />
      <div className="Root_layoutWrap">
        <MenuTab />
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
