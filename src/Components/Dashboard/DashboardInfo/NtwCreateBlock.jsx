import React from "react";
import { ResponsiveLine } from "@nivo/line";

// recoil로 불러오기
import { useRecoilValue } from "recoil";
import { networkSelector } from "../../../Recoil/Selector";

const NtwCreateBlock = () => {
  const networkData = useRecoilValue(networkSelector);

  const container_style = {
    width: "500px",
    height: "250px",
    border: "1px solid #999",
  };
  const style = {
    backgroundColor: "#ddd",
    width: "auto",
    height: "200px",
  };
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
    <div className="NtwCreateBlock" style={container_style}>
      <h4>네트워크별 블록 생성시간</h4>
      <div style={style}>
        <ResponsiveLine
          data={data}
          colors={{ scheme: "pastel1" }}
          margin={{ top: 70, right: 70, bottom: 50, left: 50 }}
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
            tickPadding: 5,
            tickRotation: 0,
          }}
          axisLeft={{
            orient: "left",
            tickSize: 0,
            tickPadding: 20,
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
    </div>
  );
};

export default NtwCreateBlock;
