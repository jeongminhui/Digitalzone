import React, { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import { Link } from "react-router-dom";

// recoil로 불러오기
import { useRecoilValue } from "recoil";
import { networkSelector } from "../../../Recoil/Selector";

const EnrollService = () => {
  const networkData = useRecoilValue(networkSelector);
  const [enroll, setEnroll] = useState([]);

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

  let enroll1 = 0;
  let enroll2 = 0;
  let enroll3 = 0;
  let enroll4 = 0;
  let enroll5 = 0;

  const makeChartData = (items) => {
    items.map((item) => {
      enroll1 += item.enrollservice["10:00"];
      enroll2 += item.enrollservice["11:00"];
      enroll3 += item.enrollservice["12:00"];
      enroll4 += item.enrollservice["13:00"];
      enroll5 += item.enrollservice["14:00"];
    });

    setEnroll({
      time1: enroll1,
      time2: enroll2,
      time3: enroll3,
      time4: enroll4,
      time5: enroll5,
    });
  };
  // makeChartData

  const data = [
    {
      id: "시간당 서비스 등록건수",
      data: [
        { x: "10:00", y: 310 },
        { x: "11:00", y: 400 },
        { x: "12:00", y: 200 },
        { x: "13:00", y: 310 },
        { x: "14:00", y: 210 },
      ],
    },
  ];
  // enroll.time1
  // enroll.time2
  // enroll.time3
  // enroll.time4
  // enroll.time5

  const tooltipStyle = {
    color: "#888888",
    background: "#fff",
    padding: "5px 10px",
    borderRadius: "3px",
    boxShadow: "var(--box-shadow-chart-tooltip)",
    textAlign: "center",
  };

  return (
    <div className="EnrollService">
      <Link to="/service">
        <div className="Dashboard_title">시간당 서비스 등록건수</div>
        <div className="Dashboard_chart">
          <ResponsiveLine
            data={data}
            margin={{ top: 20, right: 15, bottom: 40, left: 45 }}
            // colors={["#008FFB"]}
            colors={{ scheme: "category10" }}
            enableLinkGradient={true}
            // colors={["-webkit-linear-gradient(to right, #e6dada, #274046)"]}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              stacked: true,
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
            areaOpacity={0.25} //fill 효과 투명도
            animate={true}
            tooltip={(data) => {
              return (
                <div style={tooltipStyle}>
                  <span
                    style={{
                      background: data.point.serieColor,
                      display: "inline-block",
                      padding: "6px",
                    }}
                  ></span>{" "}
                  {data.point.data.y}건
                </div>
              );
            }}
          />
        </div>
      </Link>
    </div>
  );
};

export default EnrollService;
