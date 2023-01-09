import React from "react";
import SignIn1 from "../UserMyPageComponents/SignIn/SignIn1";
import "./LoginPage.scss";
import Page1 from "../../CommonComponents/Page/Page1";

const LoginPage = () => {
  return (
    <div className="LoginPage">
      <Page1>
        <img
          src={`${process.env.PUBLIC_URL}/assets/logo.png`}
          alt="logo"
          className="login_logo"
        />
        <SignIn1 />
      </Page1>
    </div>
  );
};

export default LoginPage;
