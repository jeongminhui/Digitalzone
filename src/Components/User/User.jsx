import React from "react";
import "./User.scss";
import Footer from "../Footer/Footer";
import UserDataCenter from "./UserManagementComponents/UserDataCenter";
import UserMyPage from "./UserMyPageComponents/UserMyPage";
import Modal1 from "./UserModalTest/Modal1";

const User = () => {
  return (
    <div className="User">
      <UserDataCenter />
      <Modal1 />
      <Footer />
    </div>
  );
};

export default User;
