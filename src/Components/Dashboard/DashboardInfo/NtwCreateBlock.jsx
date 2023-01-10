import React, { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import { Link } from "react-router-dom";
import "./NtwCreateBlock.scss";

// recoil로 불러오기
import { useRecoilValue } from "recoil";
import { networkSelector } from "../../../Recoil/Selector";

const NtwCreateBlock = () => {
  const networkData = useRecoilValue(networkSelector);
  const [blk1, setBlk1] = useState("");
  const [blk2, setBlk2] = useState("");
  const [blk3, setBlk3] = useState("");
  const [blk4, setBlk4] = useState("");
  const [average, setAverage] = useState("");
  let sumData = 0;
  let count = 0;

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

  // 활성상태의 네트워크(items)에서 ntwcreateblk만 추출
  const makeChartData = (items) => {
    const createblkData = items.map((item) => {
      return item.ntwcreateblk;
    });

    const network1 = createblkData[0];
    const network2 = createblkData[1];
    const network3 = createblkData[2];
    const network4 = createblkData[3];

    setBlk1(network1);
    setBlk2(network2);
    setBlk3(network3);
    setBlk4(network4);

    //평균구하기
    createblkData.map((item) => {
      sumData += item["10:00"];
      sumData += item["11:00"];
      sumData += item["12:00"];
      sumData += item["13:00"];
      count += Object.keys(item).length;
    });
    setAverage(sumData / count);
  };
  // makeChartData

  const time1 = "10:00";
  const time2 = "11:00";
  const time3 = "12:00";
  const time4 = "13:00";

  const data = [
    {
      id: "네트워크1",
      data: [
        { x: "10:00", y: blk1[time1] },
        { x: "11:00", y: blk1[time2] },
        { x: "12:00", y: blk1[time3] },
        { x: "13:00", y: blk1[time4] },
      ],
    },
    {
      id: "네트워크2",
      data: [
        { x: "10:00", y: blk2[time1] },
        { x: "11:00", y: blk2[time2] },
        { x: "12:00", y: blk2[time3] },
        { x: "13:00", y: blk2[time4] },
      ],
    },
    {
      id: "네트워크3",
      data: [
        { x: "10:00", y: blk3[time1] },
        { x: "11:00", y: blk3[time2] },
        { x: "12:00", y: blk3[time3] },
        { x: "13:00", y: blk3[time4] },
      ],
    },
    {
      id: "네트워크4",
      data: [
        { x: "10:00", y: blk4[time1] },
        { x: "11:00", y: blk4[time2] },
        { x: "12:00", y: blk4[time3] },
        { x: "13:00", y: blk4[time4] },
      ],
    },
  ];

  return (
    <div className="NtwCreateBlock">
      <Link to="/block">
        <div className="Dashboard_title">네트워크별 블록 생성시간(초)</div>
        <div className="Dashboard_seconds">{average}초</div>
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
