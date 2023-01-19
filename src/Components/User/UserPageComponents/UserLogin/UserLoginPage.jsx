import React from "react";
import UserLogin from "./Componens/UserLogin";
import "./UserLoginPage.scss";
import Footer from "../../../Footer/Footer";
import { useContext } from "react";
import { ThemeContext } from "../../../Context/ThemeContext";

const UserLoginPage = () => {
  const theme = useContext(ThemeContext);
  const darkmode = theme.isDarkMode;

  return (
    <div className="UserLogin_Page">
      <div className="LoginPage">
        <div className="page LoginBox">
          {darkmode ? (
            <img
              src={`${process.env.PUBLIC_URL}/assets/logo_white.png`}
              alt="logo"
              className="login_logo"
            />
          ) : (
            <img
              src={`${process.env.PUBLIC_URL}/assets/logo.png`}
              alt="logo"
              className="login_logo"
            />
          )}

          <UserLogin />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserLoginPage;
