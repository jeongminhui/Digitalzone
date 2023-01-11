import React from "react";
import SignIn from "../../UserMyPageComponents/SignIn";
import "./UserLogin.scss";
import Page1 from "../../../CommonComponents/Page/Page1";

const LoginPage = () => {
  return (
    <div className="LoginPage">
      <Page1>
        <img
          src={`${process.env.PUBLIC_URL}/assets/logo.png`}
          alt="logo"
          className="login_logo"
        />
        <SignIn />
      </Page1>
    </div>
  );
};

export default LoginPage;
