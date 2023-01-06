import React from "react";
import "./DashboardChart.scss";
import MixedChart from "./DashboardChart/MixedChart";
import PieChart from "./DashboardChart/PieChart";
import LineChart from "./DashboardChart/LineChart";
import FillChart from "./DashboardChart/FillChart";
import { Link } from "react-router-dom";

const DashboardChart = (props) => {
  const service = props.serviceData;

  return (
    <div className="DashboardChart">
      대시보드 하단 부분입니다 (firebase 읽기 막아둔 상태)
      {/* <Link to="/transaction">
        <MixedChart />
      </Link>
      <Link to="/block">
        <LineChart />
      </Link> 
      <Link to="/service">
        <FillChart serviceData={service} />
      </Link>
      <Link to="/service">
        <PieChart serviceData={service} />
      </Link> */}
    </div>
  );
};

export default DashboardChart;
