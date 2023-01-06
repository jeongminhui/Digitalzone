import React from "react";

// recoil로 불러오기
import { useRecoilValue } from "recoil";
import { networkSelector } from "../../../Recoil/Selector";

const ActiveNetwork = () => {
  const networkData = useRecoilValue(networkSelector);

  // const activeNetwork = networkData.filter((item) => {
  //   return item.ntwstatus === true;
  // });

  return (
    <div className="ActiveNetwork">
      <h3>ActiveNetwork</h3>
      <div>활성 네트워크 : / 전체 네트워크 : {networkData.length}</div>
    </div>
  );
};

export default ActiveNetwork;
