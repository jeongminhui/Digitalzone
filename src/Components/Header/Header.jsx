import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import Header_userIcon from "./Header_rightWrap/Header_userIcon";

const Header = () => {
  return (
    <div className="Header">
      <div className="Header_logo">
        <Link to="/">
          <img src={`${process.env.PUBLIC_URL}/assets/logo.png`} alt="logo" />
        </Link>
      </div>
      <div className="Header_rightWrap">
        <div className="Header_searchBar"></div>
        <Header_userIcon />
      </div>
    </div>
  );
};

export default Header;
