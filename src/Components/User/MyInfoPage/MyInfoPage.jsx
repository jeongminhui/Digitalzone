import React from "react";
import Page1 from "../../CommonComponents/Page/Page1";
import Footer from "../../Footer/Footer";
import "./MyInfoPage.scss";
import Avatar from "@mui/material/Avatar";

const MyInfoPage = () => {
  return (
    <div className="MyInfoPage">
      <Page1>
        <div className="MyInfoPage_top">
          <div>
            <Avatar />
          </div>
          <div className="MyInfoPage_top_right">
            <h1>김승희</h1>
            <h3>디지털존</h3>
          </div>
        </div>
      </Page1>
      <Footer />
    </div>
  );
};

export default MyInfoPage;
