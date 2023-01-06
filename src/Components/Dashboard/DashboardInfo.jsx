import React from "react";
import { Link } from "react-router-dom";
import ActiveNetworkData from "./DashboardInfo/ActiveNetworkData";
import AllBlockData from "./DashboardInfo/AllBlockData";
import AllServiceData from "./DashboardInfo/AllServiceData";
import AllTransactionData from "./DashboardInfo/AllTransactionData";

const DashboardInfo = (props) => {
  const network = props.networkData;
  const service = props.serviceData;

  return (
    <div className="DashboardInfo">
      대시보드 상단 부분입니다 (firebase 읽기 막아둔 상태)
      {/* <Link to="/block">
        <AllBlockData />
      </Link>
      <Link to="/transaction">
        <AllTransactionData />
      </Link>
      <Link to="/node">
        <ActiveNetworkData networkData={network} />
      </Link>
        <Link to="/service">
          <AllServiceData serviceData={service} />
        </Link>*/}
    </div>
  );
};

export default DashboardInfo;
