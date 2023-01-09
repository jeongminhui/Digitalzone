import React, { useEffect, useState } from "react";
import "./Service.scss";
import "../Block/Block.scss";
import Footer from "../Footer/Footer";
import ServiceTable from "./ServiceTable";

import { useRecoilValue } from "recoil";
import { serviceSelector } from "../../Recoil/Selector";
import { useNavigate } from "react-router-dom";

const Service = () => {
  const serviceData = useRecoilValue(serviceSelector);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // row 구조
    serviceData.map((item) => {
      setRows((prev) => [
        ...prev,
        {
          service: item.service,
          createdt: item.createdt,
          apitype: item.apitype,
          nodename: item.nodename,
          txnum: item.txnum,
          blocknum: item.blocknum,
          status: item.status,
        },
      ]);
    });
  }, []);

  // navigation 서비스 상세 이동
  const [blocknum, setBlocknum] = useState("");
  const navigate = useNavigate();

  const clickHandler = (blocknum, idx) => {
    navigate(`/service/${blocknum}`);
  };

  useEffect(() => {
    navigate(`/service/${blocknum}`);
  }, [blocknum]);

  return (
    <div className="Service">
      <div className="wrapper">
        <h1 className="mainTitle">서비스</h1>
        <h3 className="subTitle">
          <span className="subBar">|</span> 전체 발급 {rows.length}건
        </h3>

        <ServiceTable rows={rows} clickHandler={clickHandler} />
      </div>
      <Footer />
    </div>
  );
};

export default Service;
