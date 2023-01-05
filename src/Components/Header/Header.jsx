import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <div className="Header">
      <div className="Header_logo">
        <Link to="/">
          <img src={`${process.env.PUBLIC_URL}/assets/logo.png`} alt="logo" />
        </Link>
      </div>
      <div className="Header_rightWrap">
        <div className="Header_searchBar">
          <SearchBar />
        </div>
        <div className="Header_userIcon">User</div>
      </div>
    </div>
  );
};

export default Header;
