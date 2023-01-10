import React from "react";
import SignIn1 from "../UserMyPageComponents/SignIn/SignIn1";
import "./LoginPage.scss";
import Page1 from "../../CommonComponents/Page/Page1";
import Footer from "../../Footer/Footer";

const LoginPage = () => {
  return (
    <div className="LoginPage">
      <div className="page">
        <img
          src={`${process.env.PUBLIC_URL}/assets/logo.png`}
          alt="logo"
          className="login_logo"
        />
        <SignIn1 />
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
