import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { Link } from "react-router-dom";
import "./NtwCreateBlock.scss";

// recoil로 불러오기
import { useRecoilValue } from "recoil";
import { networkSelector } from "../../../Recoil/Selector";

const NtwCreateBlock = () => {
  const networkData = useRecoilValue(networkSelector);

  const data = [
    {
      id: "네트워크1",
      data: [
        { x: "10:00", y: 3 },
        { x: "11:00", y: 4 },
        { x: "12:00", y: 3 },
        { x: "13:00", y: 2 },
      ],
    },
    {
      id: "네트워크2",
      data: [
        { x: "10:00", y: 2 },
        { x: "11:00", y: 2 },
        { x: "12:00", y: 3 },
        { x: "13:00", y: 5 },
      ],
    },
    {
      id: "네트워크3",
      data: [
        { x: "10:00", y: 5 },
        { x: "11:00", y: 3 },
        { x: "12:00", y: 2 },
        { x: "13:00", y: 3 },
      ],
    },
    {
      id: "네트워크4",
      data: [
        { x: "10:00", y: 2 },
        { x: "11:00", y: 1 },
        { x: "12:00", y: 3 },
        { x: "13:00", y: 4 },
      ],
    },
  ];

  return (
    <div className="NtwCreateBlock">
      <Link to="/block">
        <div className="Dashboard_title">네트워크별 블록 생성시간(초)</div>
        <div className="Dashboard_seconds">- - 초</div>
        <div className="Dashboard_chart">
          <ResponsiveLine
            data={data}
            colors={{ scheme: "pastel1" }}
            style={{ width: 200, height: 100 }}
            margin={{ top: 20, right: 15, bottom: 50, left: 45 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: 0,
              max: 6,
            }}
            // 상하좌우 인덱스
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: "bottom",
              tickSize: 0,
              tickPadding: 20,
              tickRotation: 0,
            }}
            axisLeft={{
              orient: "left",
              tickSize: 0,
              tickPadding: 16,
              tickRotation: 0,
            }}
            enableGridX={false}
            enableGridY={false}
            // 기타설정
            lineWidth={4}
            enablePoints={false}
            enableCrosshair={false}
            useMesh={true}
          />
        </div>
      </Link>
    </div>
  );
};

export default NtwCreateBlock;
