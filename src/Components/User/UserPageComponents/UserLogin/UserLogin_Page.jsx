import React from "react";
import UserLogin from "./Componens/UserLogin";
import "./UserLogin_Page.scss";
import Footer from "../../../Footer/Footer";

const UserLogin_Page = () => {
  return (
    <div className="LoginPage">
      <div className="page">
        <img
          src={`${process.env.PUBLIC_URL}/assets/logo.png`}
          alt="logo"
          className="login_logo"
        />
        <UserLogin />
      </div>
      <Footer />
    </div>
  );
};

export default UserLogin_Page;
