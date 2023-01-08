import React from "react";
import "./User.scss";
import Footer from "../Footer/Footer";
import UserDataCenter from "./UserManagementComponents/UserDataCenter";
import UserMyPage from "./UserMyPageComponents/UserMyPage";
import Modal1 from "../CommonComponents/Modal/Modal1";

const User = () => {
  return (
    <div className="User">
      <Modal1 buttonName="사용자 추가">과연?!</Modal1>
      <Footer />
    </div>
  );
};

export default User;
