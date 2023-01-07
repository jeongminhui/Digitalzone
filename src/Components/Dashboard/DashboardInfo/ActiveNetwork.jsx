import React from "react";
import { Link } from "react-router-dom";
import "./ActiveNetwork.scss";
import { FaNetworkWired } from "react-icons/fa";

// recoil로 불러오기
import { useRecoilValue } from "recoil";
import { networkSelector } from "../../../Recoil/Selector";

const ActiveNetwork = (props) => {
  const networkData = useRecoilValue(networkSelector);

  // const activeNetwork = networkData.filter((item) => {
  //   return item.ntwstatus === true;
  // });

  return (
    <div className="ActiveNetwork">
      <Link to="/node">
        <div className="Dashboard_title">활성 네트워크 수</div>
        <div className="Dashboard_data">값 </div>
        <div className="Dashboard_time">{props.DateTime}</div>
      </Link>
      <div className="Dashboard_icon">
        <FaNetworkWired fill="#fff" size="30" />
      </div>
    </div>
  );
};

export default ActiveNetwork;
