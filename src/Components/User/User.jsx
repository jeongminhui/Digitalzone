import React from "react";
import "./User.scss";
import Footer from "../Footer/Footer";
import Modal1 from "../CommonComponents/Modal/Modal1";
import SignUp from "./UserMyPageComponents/SignUp/SignUp";
import UserInsertModal from "./UserInsertComponents/UserInsertModal";
import UserAdd from "./FixedComponents/UserAdd/UserAdd";
import UserList from "./FixedComponents/UserList/UserList";
import UserLogin from "./FixedComponents/UserLogin/UserLogin";
import UserMyPage from "./FixedComponents/UserMyPage/UserMyPage";
import UserUpdate from "./FixedComponents/UserUpdate/UserUpdate";

const User = () => {
  return (
    <div className="User">
      <UserList />
      {/* <UserInsertModal /> */}
    </div>
  );
};

export default User;
