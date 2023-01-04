import React from "react";
import "./Header.scss";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import Header_userIcon from "./Header_rightWrap/Header_userIcon";

const Header = () => {
  return (
    <div className="Header">
      <div className="Header_logo">Logo</div>
      <div className="Header_rightWrap">
        <div className="Header_searchBar">Search</div>
        <Header_userIcon />
      </div>
    </div>
  );
};

export default Header;
