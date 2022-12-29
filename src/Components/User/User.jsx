import React from "react";
import "./User.scss";
import Footer from "../Footer/Footer";
import Modal from "./Components/Modal";

const User = () => {
  return (
    <div className="User">
      <h1>유저 페이지입니다</h1>
      <Modal />
      <Footer />
    </div>
  );
};

export default User;
