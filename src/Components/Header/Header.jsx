import React from "react";
import "./Header.scss";

const Header = () => {
  return (
    <div className="Header">
      <div className="Header_logo">Logo</div>
      <div className="Header_rightWrap">
        <div className="Header_searchBar">Search</div>
        <div className="Header_userIcon">User</div>
      </div>
    </div>
  );
};

export default Header;
