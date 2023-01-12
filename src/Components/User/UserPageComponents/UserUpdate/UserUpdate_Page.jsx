import React, { useState, useEffect } from "react";
import UserUpdate from "./Components/UserUpdate.jsx";
import Footer from "../../../Footer/Footer";
import "./UserUpdate_Page.scss";

const UserUpdate_Page = () => {
  return (
    <div className="UserUpdate_Page">
      <div>
        <UserUpdate />
        <Footer />
      </div>
    </div>
  );
};

export default UserUpdate_Page;
