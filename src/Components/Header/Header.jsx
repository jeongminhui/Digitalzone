import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import HeaderSearchBar from "./Header_rightWrap/HeaderSearchBar";
import HeaderDarkmode from "./Header_rightWrap/HeaderDarkmode";
import HeaderUserIcon from "./Header_rightWrap/HeaderUserIcon";

const Header = (props) => {
  const { isDarkMode, toggleDarkMode } = props;

  return (
    <div className="Header">
      <div className="Header_logo">
        <Link to="/">
          <img src={`${process.env.PUBLIC_URL}/assets/logo.png`} alt="logo" />
        </Link>
      </div>
      <div className="Header_rightWrap">
        <HeaderSearchBar />
        <HeaderDarkmode
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <HeaderUserIcon />
      </div>
    </div>
  );
};

export default Header;
