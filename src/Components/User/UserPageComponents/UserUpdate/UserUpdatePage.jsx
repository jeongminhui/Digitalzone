import React, { useState, useEffect } from "react";
import UserUpdateModal from "./Components/UserUpdateModal.jsx";
import Footer from "../../../Footer/Footer";
import "./UserUpdatePage.scss";

const UserUpdatePage = () => {
  return (
    <div className="UserUpdatePage">
      <UserUpdateModal />
      <Footer />
    </div>
  );
};

export default UserUpdatePage;
