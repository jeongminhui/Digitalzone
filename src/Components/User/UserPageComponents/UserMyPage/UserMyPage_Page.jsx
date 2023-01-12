// import UserMyPage from "./Components/UserMyPage";
import React, { useEffect, useState } from "react";
import Footer from "../../../Footer/Footer";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import UserMyPage from './Components/UserMyPage';
import { useRecoilValue } from 'recoil';
import { loginSelector } from '../../../../Recoil/Selector';
import { Form, Input } from 'antd';
import { getAuth, updatePassword } from "firebase/auth";
import Swal from "sweetalert2";


const UserMyPage_Page = () => {
  const loginUser = useRecoilValue(loginSelector)
  const type = "관리자";


  return (
    <div className="MyInfoPage_Page">
      <UserMyPage />
      <Footer />
    </div>
  );
};

export default UserMyPage_Page;
