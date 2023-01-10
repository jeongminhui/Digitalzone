import React from "react";
import "./LoginPage.scss";
import Page1 from "../../CommonComponents/Page/Page1";
import Footer from "../../Footer/Footer";
import UserLogin from "../FixedComponents/UserLogin/UserLogin";

const LoginPage = () => {
  return (
    <div className="LoginPage">
      <div className="page">
        <img
          src={`${process.env.PUBLIC_URL}/assets/logo.png`}
          alt="logo"
          className="login_logo"
        />
        <UserLogin />
        {/* <SignIn1 /> */}
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
