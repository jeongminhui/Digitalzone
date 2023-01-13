import React from "react";
import ServiceChartLeft from "./ServiceChartLeft";
import ServiceChartRight from "./ServiceChartRight";

const ServiceChart = ({ rows }) => {

  return (
    <div className="chartWrapper">
      <div className="leftContainer"> 
      <ServiceChartLeft rows={rows} />
      </div>
      <div className="rightCotaliner">
      <ServiceChartRight rows={rows} />
      </div>
    </div>
  );
};

export default ServiceChart;
