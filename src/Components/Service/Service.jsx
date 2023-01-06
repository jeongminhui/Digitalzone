import React from "react";
import "./Service.scss";
import Footer from "../Footer/Footer";

const Service = () => {
  return (
    <div className="Service">
      <div className="wrapper">
        <h1 className="mainTitle">서비스</h1>
        <h3 className="subTitle">
          <span className="subBar">|</span> 전체 발급 {}건
        </h3>

        {/* <ServiceTable /> */}
      </div>
      <Footer />
    </div>
  );
};

export default Service;
