import React from "react";
import ActiveNetworkData from "./DashboardInfo/ActiveNetworkData";
import AllBlockData from "./DashboardInfo/AllBlockData";
import AllServiceData from "./DashboardInfo/AllServiceData";
import AllTransactionData from "./DashboardInfo/AllTransactionData";

const DashboardInfo = () => {
  return (
    <div className="DashboardInfo">
      대시보드 상단 부분입니다 (firebase 읽기 막아둔 상태)
      {/* <AllBlockData /> */}
      {/* <AllTransactionData /> */}
      {/* <ActiveNetworkData /> */}
      {/* <AllServiceData /> */}
    </div>
  );
};

export default DashboardInfo;
