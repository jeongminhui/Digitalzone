import React, { useContext, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { Link } from "react-router-dom";
import { ThemeContext } from "./../../Context/ThemeContext";

// recoil로 불러오기
import { useRecoilValue } from "recoil";
import { networkSelector } from "../../../Recoil/Selector";

const NtwTPS = () => {
  const theme = useContext(ThemeContext);
  const darkmode = theme.isDarkMode;

  const networkData = useRecoilValue(networkSelector);
  const [name, setName] = useState("");
  const [tps1, setTps1] = useState("");
  const [tps2, setTps2] = useState("");
  const [tps3, setTps3] = useState("");
  const [tps4, setTps4] = useState("");

  // 상태가 성공(true)인 데이터만 필터링
  useEffect(() => {
    async function getActive() {
      const data = await networkData;
      try {
        const dataFiltering = data.filter((item) => {
          return item.ntwstatus === true;
        });
        makeChartData(dataFiltering);
      } catch (err) {
        console.log(err);
      }
    }
    getActive();
  }, [networkData]);

  // 활성상태의 네트워크(items)에서 ntwtps만 추출
  const makeChartData = (items) => {
    const tpsData = items.map((item) => {
      return item.ntwtps;
    });

    const name = items.map((item) => {
      return item.ntwname;
    });
    setName(name);

    const network1 = tpsData[0];
    const network2 = tpsData[1];
    const network3 = tpsData[2];
    const network4 = tpsData[3];

    setTps1(network1);
    setTps2(network2);
    setTps3(network3);
    setTps4(network4);
  };
  // makeChartData

  const time1 = "10:00";
  const time2 = "11:00";
  const time3 = "12:00";
  const time4 = "13:00";

  const time1Aver =
    (tps1[time1] + tps2[time1] + tps3[time1] + tps4[time1]) / name.length;
  const time2Aver =
    (tps1[time2] + tps2[time2] + tps3[time2] + tps4[time2]) / name.length;
  const time3Aver =
    (tps1[time3] + tps2[time3] + tps3[time3] + tps4[time3]) / name.length;
  const time4Aver =
    (tps1[time4] + tps2[time4] + tps3[time4] + tps4[time4]) / name.length;

  const colors = ["#116eb9", "#5f88df", "#80baf4 ", " #2ba0e3", " #004c8c"];
  const data = {
    labels: [time1, time2, time3, time4],
    datasets: [
      {
        // 라인바
        type: "line",
        label: "평균",
        borderColor: colors[0],
        data: [
          { x: time1, y: time1Aver },
          { x: time2, y: time2Aver },
          { x: time3, y: time3Aver },
          { x: time4, y: time4Aver },
        ],
        borderCapStyle: "round",
        pointbarDatasetSpacing: 0,
        pointRadius: 0,
      },
      {
        // 네트워크1
        type: "bar",
        label: name[0],
        backgroundColor: colors[1],
        barPercentage: 1, // 막대사이 간격삭제
        data: [
          { x: time1, y: tps1[time1] },
          { x: time2, y: tps1[time2] },
          { x: time3, y: tps1[time3] },
          { x: time4, y: tps1[time4] },
        ],
      },
      {
        // 네트워크2
        type: "bar",
        label: name[1],
        backgroundColor: colors[2],
        barPercentage: 1,
        data: [
          { x: time1, y: tps2[time1] },
          { x: time2, y: tps2[time2] },
          { x: time3, y: tps2[time3] },
          { x: time4, y: tps2[time4] },
        ],
      },

      {
        // 네트워크3
        type: "bar",
        label: name[2],
        backgroundColor: colors[3],
        barPercentage: 1,
        data: [
          { x: time1, y: tps3[time1] },
          { x: time2, y: tps3[time2] },
          { x: time3, y: tps3[time3] },
          { x: time4, y: tps3[time4] },
        ],
      },
      {
        // 네트워크4
        type: "bar",
        label: name[3],
        backgroundColor: colors[4],
        barPercentage: 1,
        data: [
          { x: time1, y: tps4[time1] },
          { x: time2, y: tps4[time2] },
          { x: time3, y: tps4[time3] },
          { x: time4, y: tps4[time4] },
        ],
      },
    ],
  };

  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: darkmode ? "#fafbff" : "#3d3d3d",
        },
        border: {
          color: "transparent",
        },
      },
      y: {
        min: 0,
        max: 600,
        ticks: {
          stepSize: 100,
          color: darkmode ? "#fafbff" : "#3d3d3d",
        },
        grid: {
          color: darkmode ? "#888888" : "#ebedf3",
          drawTicks: false,
        },
        border: {
          color: "transparent",
        },
      },
    },

    plugins: {
      legend: {
        display: false,
      },
      // 툴팁
      tooltip: {
        enabled: true,
        position: "nearest",
        backgroundColor: "#fff",
        title: "",
        titleAlign: "center",
        titleColor: "#888888",
        bodyAlign: "center",
        bodyColor: "#555",
        bodyFont: {
          font: {
            family: "'Noto Sans KR', sans-serif",
          },
        },
        caretPadding: 0,
        caretSize: 0,
        cornerRadius: 3,
        multiKeyBackground: "transparent",
        cornerRadius: 5,
        displayColors: true,
        borderWidth: 3,
      },
    },
  };

  return (
    <div className="NtwTPS Dashboard_chartBox">
      <Link to="/transaction">
        <div className="Dashboard_title">네트워크별 트랜잭션 처리속도</div>
        <div className="Dashboard_chart">
          <Line type="line" data={data} options={options} />
        </div>
      </Link>
    </div>
  );
};

export default NtwTPS;
