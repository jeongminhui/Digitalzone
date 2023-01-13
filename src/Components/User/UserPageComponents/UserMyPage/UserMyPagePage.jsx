// import UserMyPage from "./Components/UserMyPage";
import React, { useEffect, useState } from "react";
import Footer from "../../../Footer/Footer";
<<<<<<< HEAD:src/Components/User/UserPageComponents/UserMyPage/UserMyPage_Page.jsx
=======
import "./UserMyPagePage.scss";
>>>>>>> 43d9dcd4aac2d4c29c86645e75784e219e67b677:src/Components/User/UserPageComponents/UserMyPage/UserMyPagePage.jsx
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import UserMyPage from './Components/UserMyPage';
import { useRecoilValue } from 'recoil';
import { loginSelector } from '../../../../Recoil/Selector';
import { Form, Input } from 'antd';
import { getAuth, updatePassword } from "firebase/auth";
import Swal from "sweetalert2";
import "./UserMyPage_Page.scss"

<<<<<<< HEAD:src/Components/User/UserPageComponents/UserMyPage/UserMyPage_Page.jsx
const UserMyPage_Page = () => {
  const loginUser = useRecoilValue(loginSelector)
=======
const UserMyPagePage = () => {
  const userid = "userdatazone01@minions.com";
>>>>>>> 43d9dcd4aac2d4c29c86645e75784e219e67b677:src/Components/User/UserPageComponents/UserMyPage/UserMyPagePage.jsx
  const type = "관리자";


  return (
    <div className="MyInfoPage_Page">
      <UserMyPage />
      {/* <Footer /> */}
    </div>
  );
};

export default UserMyPagePage;
