import React from "react";
import { ResponsiveLine } from "@nivo/line";

const ChartRight= () => {
  const container_style = {
    width: "500px",
    height: "250px",
    backgroundColor: "#eee",
  };
  const style = { border: "2px solid #000", width: "500px", height: "200px" };

  const data = [
    {
      id: "시간당 서비스 등록건수",
      data: [
        { x: "10:00", y: 300 },
        { x: "11:00", y: 240 },
        { x: "12:00", y: 320 },
        { x: "13:00", y: 210 },
        { x: "14:00", y: 345 },
      ],
    },
  ];

  return (
    <div className="FillChart" style={container_style}>
      <h4>평균 트랜잭션 크기(KB)</h4>
      <div style={style}>
        <ResponsiveLine
          data={data}
          margin={{ top: 70, right: 70, bottom: 50, left: 50 }}
          colors={{ scheme: "pastel1" }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: 0,
            max: 400,
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
          // 기타설정
          lineWidth={4}
          enablePoints={false}
          enableCrosshair={false}
          useMesh={true} // MouseHover시 효과
          enableArea={true} //fill 효과
          areaOpacity={0.45} //fill 효과 투명도
        />
      </div>
    </div>
  );
};

export default ChartRight;
