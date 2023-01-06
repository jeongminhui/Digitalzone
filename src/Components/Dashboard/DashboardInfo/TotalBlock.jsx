import React from "react";

// recoil로 불러오기
import { useRecoilValue } from "recoil";
import { blockSelector } from "../../../Recoil/Selector";

const TotalBlock = () => {
  const blockData = useRecoilValue(blockSelector);

  return (
    <div className="TotalBlock">
      <h3>TotalBlock</h3>
      <div>전체 블록 수 : {blockData.length} </div>
    </div>
  );
};

export default TotalBlock;
