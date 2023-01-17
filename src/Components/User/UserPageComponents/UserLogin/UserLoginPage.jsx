import React from "react";
import UserLogin from "./Componens/UserLogin";
import "./UserLoginPage.scss";
import Footer from "../../../Footer/Footer";

const UserLoginPage = () => {
  return (
    <div className="UserLogin_Page">
      <div className="LoginPage">
        <div className="page">
          <img
            src={`${process.env.PUBLIC_URL}/assets/logo.png`}
            alt="logo"
            className="login_logo"
          />
          <UserLogin />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserLoginPage;
