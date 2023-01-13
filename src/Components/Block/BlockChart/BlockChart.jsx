import React, { useEffect, useState } from "react";
import BlockChartLeft from "./BlockChartLeft";
import BlockChartRight from "./BlockChartRight";

const BlockChart = ({ rows }) => {
  const containerStyle = {
    width: "480px",
    height: "300px",
  };

  return (
    <div className="chartWrapper">
      <BlockChartLeft rows={rows} containerStyle={containerStyle} />
      <BlockChartRight rows={rows} containerStyle={containerStyle} />
    </div>
  );
};
export default BlockChart;
