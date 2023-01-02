import React from "react";
import "./User.scss";
import Footer from "../Footer/Footer";
import UserDataCenter from "./UserManagementComponents/UserDataCenter";
import UserAddPage from "./UserAddPage";
import UserMyPage from "./UserMyPageComponents/UserMyPage";

const User = () => {
  return (
    <div className="User">
      {/* <UserDataCenter /> */}
      <Footer />
      <UserMyPage />
    </div>
  );
};

export default User;
