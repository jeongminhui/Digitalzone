import React from "react";
import "./User.scss";
import Footer from "../Footer/Footer";
import UserDataCenter from "./UserManagementComponents/UserDataCenter";
import UserAddPage from "./UserAddPage";
import UserMyPage from "./UserMyPageComponents/UserMyPage";
import UserListPage from "./UserManagementComponents/UserListPage";
import UserInsertModal from "./UserInsertComponents/UserInsertModal";
import Modal2 from "./UserInsertComponents/Modal2";

const User = () => {
  return (
    <div className="User">
      {/* <Modal2 /> */}
      {/* <UserDataCenter /> */}
      {/* 파이어베이스 떄문인지 아직도 화면 안뜸. 그래서 주석처리함. */}
      {/* <UserInsertModal /> */}
      <Footer />
    </div>
  );
};

export default User;
