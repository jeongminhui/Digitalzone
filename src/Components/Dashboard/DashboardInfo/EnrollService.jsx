import React, { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import { Link } from "react-router-dom";

// recoil로 불러오기
import { useRecoilValue } from "recoil";
import { networkSelector } from "../../../Recoil/Selector";

const EnrollService = () => {
  const networkData = useRecoilValue(networkSelector);
  const [active, setActive] = useState("");
  const [enroll, setEnroll] = useState([]);

  // 활성네트워크만 필터링 (=active)
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

  // 활성 네트워크 중 enrollservice 값만 추출해서 함수로 넘겨주기
  useEffect(() => {
    async function getService() {
      const data = await active;
      data.map((item, idx) => {
        return makeChartData(item.enrollservice);
      });
    }
    getService();
  }, [active]);

  let enroll1 = 0;
  let enroll2 = 0;
  let enroll3 = 0;
  let enroll4 = 0;
  let enroll5 = 0;

  const makeChartData = (item) => {
    enroll1 += item["10:00"];
    enroll2 += item["11:00"];
    enroll3 += item["12:00"];
    enroll4 += item["13:00"];
    enroll5 += item["14:00"];

    setEnroll({
      time1: enroll1,
      time2: enroll2,
      time3: enroll3,
      time4: enroll4,
      time5: enroll5,
    });
  };

  const data = [
    {
      id: "시간당 서비스 등록건수",
      data: [
        { x: "10:00", y: enroll.time1 },
        { x: "11:00", y: enroll.time2 },
        { x: "12:00", y: enroll.time3 },
        { x: "13:00", y: enroll.time4 },
        { x: "14:00", y: enroll.time5 },
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
            colors={["#008FFB"]}
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
            areaOpacity={0.3} //fill 효과 투명도
          />
        </div>
      </Link>
    </div>
  );
};

export default EnrollService;
