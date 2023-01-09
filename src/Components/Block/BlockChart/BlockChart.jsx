import React, { useEffect, useState } from "react";
import BlockChartLeft from "./BlockChartLeft";
import BlockChartRight from "./BlockChartRight";

const BlockChart = ({ rows }) => {
  const containerStyle = {
    width: "400px",
    height: "200px",
    margin: "50px",
    marginTop: "0",
  };

  return (
    <div className="chartWrapper">
      <BlockChartLeft rows={rows} containerStyle={containerStyle} />
      <BlockChartRight rows={rows} containerStyle={containerStyle} />
    </div>
  );
};
export default BlockChart;
