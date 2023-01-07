import React from "react";
import { Link } from "react-router-dom";
import "./TotalService.scss";

// recoil로 불러오기
import { useRecoilValue } from "recoil";
import { serviceSelector } from "../../../Recoil/Selector";

const TotalService = (props) => {
  const serviceData = useRecoilValue(serviceSelector);

  return (
    <div className="TotalService">
      <Link to="/service">
        <div className="Dashboard_title">전체 서비스 등록 건수</div>
        <div className="Dashboard_data">값 </div>
        <div className="Dashboard_time">{props.DateTime}</div>
      </Link>
      <div className="Dashboard_icon">아이콘</div>
    </div>
  );
};

export default TotalService;
