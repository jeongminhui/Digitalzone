import React from "react";

// recoil로 불러오기
import { useRecoilValue } from "recoil";
import { transactionSelector } from "../../../Recoil/Selector";

const TotalTransaction = () => {
  const transactionData = useRecoilValue(transactionSelector);

  return (
    <div className="TotalTransaction">
      <h3>TotalTransaction</h3>
      <div>전체 트랜잭션 수 : {transactionData.length} </div>
    </div>
  );
};

export default TotalTransaction;
