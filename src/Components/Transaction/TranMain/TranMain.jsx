import React, { useEffect, useState } from "react";
import ChartLeft from "./ChartLeft";
import ChartRight from "./ChartRight";
import TranTable from "./TranTable";
import { useNavigate } from "react-router-dom";
import "../../Transaction/Transaction.scss";

// row 구조
const TranMain = ({ rows }) => {
  // navigation 상세 이동
  const [txnum, setTxnum] = useState("");
  const navigate = useNavigate();

  const clickHandler = (txnum) => {
    navigate(`/transaction/${txnum}`);
  };

  useEffect(() => {
    navigate(`/transaction/${txnum}`);
  }, [txnum]);

  return (
    <div className="TranMain">
        <h1 className="mainTitle">트랜잭션</h1>
        <h3 className="subTitle">
          <span className="subBar">|</span> 전체 트랜잭션 {rows.length}개
        </h3>
        <div className="chartWrapper">
          <ChartLeft />
          <ChartRight />
        </div>
        <TranTable rows={rows} clickHandler={clickHandler} />
      </div>
  );
};

export default TranMain;
