import React from "react";
import "./User.scss";
import Footer from "../Footer/Footer";
import UserDataCenter from "./UserDataCenter";

const User = () => {
  return (
    <div className="User">
      <h1>사용자 정보</h1>
      <h3>
        <span>
          <b>|</b>
        </span>
        전체 사용자
      </h3>

      <UserDataCenter />
      <Footer />
    </div>
  );
};

export default User;
