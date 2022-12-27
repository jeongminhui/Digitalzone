import React from "react";
import "./MenuTab.scss";
import { Link } from "react-router-dom";

const MenuTab = () => {
  return (
    <div className="MenuTab">
      <ul>
        <li>
          <Link to="/">대시보드</Link>
        </li>
        <li>
          <Link to="/block">블록</Link>
        </li>
        <li>
          <Link to="/transaction">트랜잭션</Link>
        </li>
        <li>
          <Link to="/node">노드</Link>
        </li>
        <li>
          <Link to="/service">서비스</Link>
        </li>
      </ul>
    </div>
  );
};

export default MenuTab;
