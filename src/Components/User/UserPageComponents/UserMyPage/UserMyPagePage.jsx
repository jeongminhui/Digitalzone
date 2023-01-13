// import UserMyPage from "./Components/UserMyPage";
import React from "react";
import Footer from "../../../Footer/Footer";
import "./UserMyPagePage.scss";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import UserMyPage from "./Components/UserMyPage";

const UserMyPagePage = () => {
  const userid = "userdatazone01@minions.com";
  const type = "관리자";

  return (
    <div className="MyInfoPagePage">
      <div className="MyInfoPage">
        <div className="MyInfoPage_top">
          <div className="MyInfoPage_top_left">
            <AccountCircleRoundedIcon sx={{ fontSize: 80 }} color="disabled" />
          </div>
          <div className="MyInfoPage_top_right">
            <h1>김승희</h1>
            <h3>디지털존</h3>
          </div>
        </div>
        <div className="MyInfoPage_bottom">
          <UserMyPage />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserMyPagePage;
