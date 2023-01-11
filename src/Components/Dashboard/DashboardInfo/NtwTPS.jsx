import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { Link } from "react-router-dom";

// recoil로 불러오기
import { useRecoilValue } from "recoil";
import { networkSelector } from "../../../Recoil/Selector";

const NtwTPS = () => {
  const networkData = useRecoilValue(networkSelector);
  const [tps1, setTps1] = useState("");
  const [tps2, setTps2] = useState("");
  const [tps3, setTps3] = useState("");
  const [tps4, setTps4] = useState("");

  // 상태가 성공(true)인 데이터만 필터링
  useEffect(() => {
    async function getActive() {
      const data = await networkData;
      const dataFiltering = data.filter((item) => {
        return item.ntwstatus === true;
      });
      makeChartData(dataFiltering);
    }
    getActive();
  }, [networkData]);

  // 활성상태의 네트워크(items)에서 ntwtps만 추출
  const makeChartData = (items) => {
    const tpsData = items.map((item) => {
      return item.ntwtps;
    });

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

  const time1Aver = (tps1[time1] + tps2[time1] + tps3[time1] + tps4[time1]) / 4;
  const time2Aver = (tps1[time2] + tps2[time2] + tps3[time2] + tps4[time2]) / 4;
  const time3Aver = (tps1[time3] + tps2[time3] + tps3[time3] + tps4[time3]) / 4;
  const time4Aver = (tps1[time4] + tps2[time4] + tps3[time4] + tps4[time4]) / 4;

  const data = {
    labels: [time1, time2, time3, time4],
    datasets: [
      {
        // 라인바
        type: "line",
        borderColor: "#116eb9",
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
        backgroundColor: "#5f88df",
        data: [
          { x: time1, y: tps1[time1] },
          { x: time2, y: tps1[time2] },
          { x: time3, y: tps1[time3] },
          { x: time4, y: tps1[time4] },
        ],
        barPercentage: 1, // 막대사이 간격삭제
      },
      {
        // 네트워크2
        type: "bar",
        backgroundColor: "#80baf4",
        data: [
          { x: time1, y: tps2[time1] },
          { x: time2, y: tps2[time2] },
          { x: time3, y: tps2[time3] },
          { x: time4, y: tps2[time4] },
        ],
        barPercentage: 1, // 막대사이 간격삭제
      },

      {
        // 네트워크3
        type: "bar",
        backgroundColor: "#2ba0e3",
        data: [
          { x: time1, y: tps3[time1] },
          { x: time2, y: tps3[time2] },
          { x: time3, y: tps3[time3] },
          { x: time4, y: tps3[time4] },
        ],
        barPercentage: 1, // 막대사이 간격삭제
      },
      {
        // 네트워크4
        type: "bar",
        backgroundColor: "#004c8c",
        data: [
          { x: time1, y: tps4[time1] },
          { x: time2, y: tps4[time2] },
          { x: time3, y: tps4[time3] },
          { x: time4, y: tps4[time4] },
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
      padding: 12,
    },
  };

  return (
    <div className="NtwTPS">
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
