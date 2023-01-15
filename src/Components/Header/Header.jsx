import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import HeaderSearchBar from "./Header_rightWrap/HeaderSearchBar";
import HeaderDarkmode from "./Header_rightWrap/HeaderDarkmode";
import HeaderUserIcon from "./Header_rightWrap/HeaderUserIcon";
import { ThemeContext } from "../Context/ThemeContext";

const Header = () => {
  const theme = useContext(ThemeContext);
  const darkmode = theme.isDarkMode;

  return (
    <div className="Header">
      <div className="Header_logo">
        <Link to="/">
          {darkmode ? (
            <img
              src={`${process.env.PUBLIC_URL}/assets/logo_white.png`}
              alt="logo"
            />
          ) : (
            <img src={`${process.env.PUBLIC_URL}/assets/logo.png`} alt="logo" />
          )}
        </Link>
      </div>
      <div className="Header_rightWrap">
        <HeaderSearchBar />
        <HeaderDarkmode />
        <HeaderUserIcon />
      </div>
    </div>
  );
};

export default Header;
