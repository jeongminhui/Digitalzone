import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { Link } from "react-router-dom";

// recoil로 불러오기
import { useRecoilValue } from "recoil";
import { networkSelector } from "../../../Recoil/Selector";

const NtwTPS = () => {
  const networkData = useRecoilValue(networkSelector);
  const [active, setActive] = useState("");
  const [tps, setTps] = useState([]);

  // 활성네트워크만 필터링
  useEffect(() => {
    async function getActive() {
      const data = await networkData;
      const dataFiltering = data.filter((item) => {
        return item.ntwstatus === true;
      });
      setActive(dataFiltering);
    }
    getActive();
  }, [networkData]);

  // 활성네트워크에서 ntwtps만 뽑음
  useEffect(() => {
    async function getNetwork() {
      const data = await active;
      const dataFiltering = data.map((item) => {
        return item.ntwtps;
      });
      setTps(dataFiltering);
    }
    getNetwork();
  }, [active]);

  console.log("tps : ", tps);
  console.log("active : ", active);

  // ------------------------------------------
  // useEffect(() => {
  //   const timeArr = tps.map((item) => {
  //     return Object.keys(item).sort();
  //   });
  //   setTest(timeArr);
  // }, [tps]);

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
      padding: 12,
    },
  };

  return (
    <div className="NtwTPS">
      <Link to="/transaction">
        <div className="Dashboard_title">네트워크별 트랜잭션 처리속도</div>
        <div className="Dashboard_chart">
          <Line
            type="line"
            data={{
              labels: ["10:00", "11:00", "12:00", "13:00"],
              datasets: [
                {
                  // 라인바
                  type: "line",
                  borderColor: "#116eb9",
                  data: [
                    { x: "10:00", y: 280 },
                    { x: "11:00", y: 400 },
                    { x: "12:00", y: 350 },
                    { x: "13:00", y: 300 },
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
            }}
            options={options}
          />
        </div>
      </Link>
    </div>
  );
};

export default NtwTPS;
