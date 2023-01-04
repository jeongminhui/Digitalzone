import React from "react";
import "./DashboardChart.scss";
import MixedChart from "./DashboardChart/MixedChart";
import PieChart from "./DashboardChart/PieChart";
import LineChart from "./DashboardChart/LineChart";
import FillChart from "./DashboardChart/FillChart";

const DashboardChart = () => {
  return (
    <div className="DashboardChart">
      <MixedChart />
      <LineChart />
      <FillChart />
      <PieChart />
    </div>
  );
};

export default DashboardChart;
