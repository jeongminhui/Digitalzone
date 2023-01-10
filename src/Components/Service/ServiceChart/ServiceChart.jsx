import React from "react";
import ServiceChartLeft from "./ServiceChartLeft";
import ServiceChartRight from "./ServiceChartRight";

const ServiceChart = ({ rows }) => {
  const containerStyle = {
    width: "480px",
    height: "300px",
  };

  return (
    <div className="chartWrapper">
      <ServiceChartLeft rows={rows} ontainerStyle={containerStyle} />
      <ServiceChartRight rows={rows} ontainerStyle={containerStyle} />
    </div>
  );
};

export default ServiceChart;
