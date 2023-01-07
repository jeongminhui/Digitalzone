import React from "react";
import { Link } from "react-router-dom";
import "./TotalTransaction.scss";

// recoil로 불러오기
import { useRecoilValue } from "recoil";
import { transactionSelector } from "../../../Recoil/Selector";

const TotalTransaction = (props) => {
  const transactionData = useRecoilValue(transactionSelector);

  return (
    <div className="TotalTransaction">
      <Link to="/transaction">
        <div className="Dashboard_title">전체 트랜잭션 수</div>
        <div className="Dashboard_data">값</div>
        <div className="Dashboard_time">{props.DateTime}</div>
      </Link>
      <div className="Dashboard_icon">아이콘</div>
    </div>
  );
};

export default TotalTransaction;
