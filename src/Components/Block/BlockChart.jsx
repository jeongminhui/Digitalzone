import { Block } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
const BlockChart = ({ rows }) => {
  const [ten, setTen] = useState({});

  const containerStyle = {
    width: "400px",
    height: "200px",
    margin: "50px",
  };

  //  console.log(rows);

  useEffect(() => {
    const timeFilter10 = rows.filter(
      (item) => item.createdt.slice(11, 13) === "10"
    );
    const timeFilter11 = rows.filter(
      (item) => item.createdt.slice(11, 13) === "11"
    );
    const timeFilter12 = rows.filter(
      (item) => item.createdt.slice(11, 13) === "12"
    );
    const timeFilter13 = rows.filter(
      (item) => item.createdt.slice(11, 13) === "13"
    );
    const timeFilter14 = rows.filter(
      (item) => item.createdt.slice(11, 13) === "14"
    );
    setTen({
      ten: timeFilter10.length,
      eleven: timeFilter11.length,
      twelve: timeFilter12.length,
      thirteen: timeFilter13.length,
      fourteen: timeFilter14.length,
    });
  }, [rows]);

  return(
  <div className="chartWrapper">
    <div className="leftChart" style={containerStyle}>
      <ApexCharts
        type="area"
        series={[
          {
            name: "시간당 블록 수(개)",
            data: [ten.ten, ten.eleven, ten.twelve, ten.thirteen, ten.fourteen],
          },
        ]}
        options={{
          chart: {
            height: 300,
            width: 500,
            toolbar: {
              show: false,
            },
          },
          title: {
            text: "시간당 블록 수(개)",
            align: "center",
          },
          stroke: {
            //선의 커브를 부드럽게 하고, 두께를 3으로 지정
            curve: "smooth",
            width: 3,
          },
          xaxis: {
            categories: ["10:00", "11:00", "12:00", "13:00", "14:00"],
          },
        }}
      ></ApexCharts>
    </div>
    
    <div className="rightChart" style={containerStyle}>
      <ApexCharts
        type="area"
        series={[
          {
            name: "시간당 블록 수(개)",
            data: [ten.ten, ten.eleven, ten.twelve, ten.thirteen, ten.fourteen],
          },
        ]}
        options={{
          chart: {
            height: 300,
            width: 500,
            toolbar: {
              show: false,
            },
          },
          title: {
            text: "시간당 블록 수(개)",
            align: "center",
          },
          stroke: {
            //선의 커브를 부드럽게 하고, 두께를 3으로 지정
            curve: "smooth",
            width: 3,
          },
          xaxis: {
            categories: ["10:00", "11:00", "12:00", "13:00", "14:00"],
          },
        }}
      ></ApexCharts>
    </div>
  </div>
  );
};
export default BlockChart;
