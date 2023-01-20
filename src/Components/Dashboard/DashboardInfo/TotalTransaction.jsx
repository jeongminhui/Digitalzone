import React from "react";
import { Link } from "react-router-dom";
import { FaServer } from "react-icons/fa";
import Time from "./Time";

// recoil로 불러오기
import { useRecoilValue } from "recoil";
import { transactionSelector } from "../../../Recoil/Selector";

const TotalTransaction = () => {
  const transactionData = useRecoilValue(transactionSelector);

  return (
    <div className="TotalTransaction Dashboard_infoBox">
      <Link to="/transaction">
        <div className="Dashboard_title">전체 트랜잭션 수</div>
        <div className="Dashboard_data">{transactionData.length}</div>
        <div className="Dashboard_time">
          <Time />
        </div>
      </Link>
      <div className="Dashboard_icon Dashboard_iconBorder">
        <FaServer fill="#fff" size="20" />
      </div>
    </div>
  );
};

export default TotalTransaction;
