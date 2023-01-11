import React from "react";
import { NavLink } from "react-router-dom";
import "./MenuTab.scss";
import { MdDashboard } from "react-icons/md";
import { IoCube } from "react-icons/io5";
import { FaServer } from "react-icons/fa";
import { FaNetworkWired } from "react-icons/fa";
import { MdOutlineMiscellaneousServices } from "react-icons/md";

const MenuTab = () => {
  const activeStyle = {
    background: "#fafbff",
    color: "#4669f5",
  };

  const deactiveStyle = {
    backgroud: "#4669f5",
    color: "#fafbff",
  };

  return (
    <div className="MenuTab">
      <ul>
        <li>
          <NavLink
            to="/"
            style={({ isActive }) => {
              return isActive ? activeStyle : deactiveStyle;
            }}
          >
            <MdDashboard />
            대시보드
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/block"
            style={({ isActive }) => {
              return isActive ? activeStyle : deactiveStyle;
            }}
          >
            <IoCube />
            블록
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/transaction"
            style={({ isActive }) => {
              return isActive ? activeStyle : deactiveStyle;
            }}
          >
            <FaServer />
            트랜잭션
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/node"
            style={({ isActive }) => {
              return isActive ? activeStyle : deactiveStyle;
            }}
          >
            <FaNetworkWired />
            노드
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/service"
            style={({ isActive }) => {
              return isActive ? activeStyle : deactiveStyle;
            }}
          >
            <MdOutlineMiscellaneousServices />
            서비스
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default MenuTab;
