import React, { useState } from "react";
import "./User.scss";
import Footer from "../Footer/Footer";
import UserDataCenter from "./UserManagementComponents/UserDataCenter";
import UserAddPage from "./UserAddPage";
import UserInsertModal from "./UserInsertComponents/UserInsertModal";

const User = () => {
  return (
    <div className="User">
      <div className="UserTopContainer">
        <div className="UserTopContainer_left">
          <h1>사용자 정보</h1>
          <h3>
            <span>
              <b>|</b>
            </span>
            전체 사용자
          </h3>
        </div>
        <div className="UserTopContainer_right">
          <button className="btn">
            {/* onClick 이벤트 걸어 주어야 함. 함수 짜기. */}
            사용자 추가
          </button>
        </div>
      </div>
      <UserDataCenter />
      <Footer />
    </div>
  );
};

export default User;
