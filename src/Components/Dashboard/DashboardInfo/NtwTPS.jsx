import React from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { Link } from "react-router-dom";

// recoil로 불러오기
import { useRecoilValue } from "recoil";
import { networkSelector } from "../../../Recoil/Selector";

const NtwTPS = () => {
  const networkData = useRecoilValue(networkSelector);

  const time1 = "10:00";
  const time2 = "11:00";
  const time3 = "12:00";
  const time4 = "13:00";

  const data = {
    labels: [time1, time2, time3, time4],
    datasets: [
      {
        // 라인바
        type: "line",
        borderColor: "#116eb9",
        data: [
          { x: time1, y: 280 },
          { x: time2, y: 400 },
          { x: time3, y: 350 },
          { x: time4, y: 300 },
        ],
        borderCapStyle: "round",
        pointbarDatasetSpacing: 0,
        pointRadius: 0,
      },
      {
        // 네트워크1
        type: "bar",
        backgroundColor: "#5f88df",
        data: [
          { x: "10:00", y: 200 },
          { x: "11:00", y: 300 },
          { x: "12:00", y: 300 },
          { x: "13:00", y: 250 },
        ],
        barPercentage: 1, // 막대사이 간격삭제
      },
      {
        // 네트워크2
        type: "bar",
        backgroundColor: "#80baf4",
        data: [
          { x: "10:00", y: 300 },
          { x: "11:00", y: 500 },
          { x: "12:00", y: 300 },
          { x: "13:00", y: 350 },
        ],
        barPercentage: 1, // 막대사이 간격삭제
      },

      {
        // 네트워크3
        type: "bar",
        backgroundColor: "#2ba0e3",
        data: [
          { x: "10:00", y: 250 },
          { x: "11:00", y: 350 },
          { x: "12:00", y: 350 },
          { x: "13:00", y: 310 },
        ],
        barPercentage: 1, // 막대사이 간격삭제
      },
      {
        // 네트워크4
        type: "bar",
        backgroundColor: "#004c8c",
        data: [
          { x: "10:00", y: 350 },
          { x: "11:00", y: 350 },
          { x: "12:00", y: 400 },
          { x: "13:00", y: 300 },
        ],
        barPercentage: 1, // 막대사이 간격삭제
      },
    ],
  };

  const options = {
    scales: {
      x: {
        grid: {
          lineWidth: 0, // x축 라인제거
        },
      },
      y: {
        min: 0,
        max: 600,
        ticks: {
          stepSize: 100,
        },
      },
    },

    plugins: {
      // 라벨제거
      // true:표시, false:숨김
      legend: {
        display: false,
      },
      // 툴팁
      // enabled true:표시, false:숨김
      tooltip: {
        position: "nearest",
        enabled: true,
        backgroundColor: "#fff",
        titleAlign: "center",
        titleColor: "#000",
        bodyAlign: "center",
        bodyColor: "#555",
        padding: 10,
        caretPadding: 0,
        caretSize: 10,
        cornerRadius: 5,
        displayColors: true,
        borderColor: "#444",
        borderWidth: 3,
      },
    },

    layout: {
      padding: 10,
    },
  };

  return (
    <div className="NtwTPS">
      <Link to="/transaction">
        <div className="Dashboard_title">네트워크별 트랜잭션 처리속도</div>
        <Line
          className="Dashboard_chart"
          type="line"
          data={data}
          options={options}
        />
      </Link>
    </div>
  );
};

export default NtwTPS;
