import React from "react";
import "./User.scss";
import Footer from "../Footer/Footer";
import Modal1 from "../CommonComponents/Modal/Modal1";
import SignUp from "./UserMyPageComponents/SignUp";
import UserDataCenter from "./UserManagementComponents/UserDataCenter";

const User = () => {
  return (
    <div className="User">
      <UserDataCenter />
    </div>
  );
};

export default User;
