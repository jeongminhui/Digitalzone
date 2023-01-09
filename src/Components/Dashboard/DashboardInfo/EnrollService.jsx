import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { Link } from "react-router-dom";

// recoil로 불러오기
import { useRecoilValue } from "recoil";
import { networkSelector } from "../../../Recoil/Selector";

const EnrollService = () => {
  const networkData = useRecoilValue(networkSelector);

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
    <div className="EnrollService">
      <Link to="/service">
        <div className="Dashboard_title">시간당 서비스 등록건수</div>
        <div className="Dashboard_chart">
          <ResponsiveLine
            data={data}
            margin={{ top: 20, right: 15, bottom: 40, left: 45 }}
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
              tickPadding: 10,
              tickRotation: 0,
            }}
            axisLeft={{
              orient: "left",
              tickSize: 0,
              tickPadding: 12,
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
      </Link>
    </div>
  );
};

export default EnrollService;
