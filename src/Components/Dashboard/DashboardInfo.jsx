import React from "react";
import ActiveNetworkData from "./DashboardInfo/ActiveNetworkData";
import AllBlockData from "./DashboardInfo/AllBlockData";
import AllServiceData from "./DashboardInfo/AllServiceData";
import AllTransactionData from "./DashboardInfo/AllTransactionData";

const DashboardInfo = () => {
  return (
    <div className="DashboardInfo">
      <AllBlockData />
      <AllTransactionData />
      <ActiveNetworkData />
      <AllServiceData />
    </div>
  );
};

export default DashboardInfo;
