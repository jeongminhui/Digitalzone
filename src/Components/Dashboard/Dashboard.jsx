import React from "react";
import "./Dashboard.scss";
import DashboardInfo from "./DashboardInfo";
import DashboardChart from "./DashboardChart";
import Footer from "../Footer/Footer";

const Dashboard = () => {
  return (
    <div className="Dashboard">
      <DashboardInfo />
      <DashboardChart />
      <Footer />
    </div>
  );
};

export default Dashboard;
