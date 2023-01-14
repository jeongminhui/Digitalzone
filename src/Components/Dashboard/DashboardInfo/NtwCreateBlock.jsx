import React, { useContext, useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import { Link } from "react-router-dom";
import { ThemeContext } from "./../../Context/ThemeContext";

// recoil로 불러오기
import { useRecoilValue } from "recoil";
import { networkSelector } from "../../../Recoil/Selector";

const NtwCreateBlock = () => {
  const theme = useContext(ThemeContext);
  const darkmode = theme.isDarkMode;

  const networkData = useRecoilValue(networkSelector);
  const [name, setName] = useState("");
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

    const name = items.map((item) => {
      return item.ntwname;
    });
    setName(name);

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
    setAverage((sumData / count).toFixed(2));
  };
  // makeChartData

  const time1 = "10:00";
  const time2 = "11:00";
  const time3 = "12:00";
  const time4 = "13:00";

  const data = [
    {
      id: name[0],
      data: [
        { x: "10:00", y: blk1[time1] },
        { x: "11:00", y: blk1[time2] },
        { x: "12:00", y: blk1[time3] },
        { x: "13:00", y: blk1[time4] },
      ],
    },
    {
      id: name[1],
      data: [
        { x: "10:00", y: blk2[time1] },
        { x: "11:00", y: blk2[time2] },
        { x: "12:00", y: blk2[time3] },
        { x: "13:00", y: blk2[time4] },
      ],
    },
    {
      id: name[2],
      data: [
        { x: "10:00", y: blk3[time1] },
        { x: "11:00", y: blk3[time2] },
        { x: "12:00", y: blk3[time3] },
        { x: "13:00", y: blk3[time4] },
      ],
    },
    {
      id: name[3],
      data: [
        { x: "10:00", y: blk4[time1] },
        { x: "11:00", y: blk4[time2] },
        { x: "12:00", y: blk4[time3] },
        { x: "13:00", y: blk4[time4] },
      ],
    },
  ];

  const tooltipStyle = {
    color: "#888888",
    background: "#fff",
    padding: "5px 10px",
    borderRadius: "3px",
    boxShadow: "var(--box-shadow-chart-tooltip)",
  };

  const test = {};

  return (
    <div className="NtwCreateBlock">
      <Link to="/block">
        <div className="Dashboard_title">네트워크별 블록 생성시간(초)</div>
        <div className="Dashboard_seconds">{average}초</div>
        <div className="Dashboard_chart">
          <ResponsiveLine
            data={data}
            colors={["#5f88df", "#80baf4 ", " #2ba0e3", " #004c8c"]}
            style={{ width: 200, height: 100 }}
            margin={{ top: 20, right: 35, bottom: 50, left: 65 }}
            theme={{
              axis: {
                ticks: {
                  text: {
                    fontSize: 12,
                    fill: darkmode ? "#fafbff" : "#3d3d3d",
                  },
                },
              },
            }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: 0,
              max: "6",
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
            scale={[0, 20, 40, 60, 80]}
            axisLeft={{
              orient: "left",
              tickSize: 0,
              tickPadding: 16,
              tickRotation: 0,
              tickValues: [0, 2, 4, 6],
            }}
            enableGridX={false}
            enableGridY={false}
            // 기타설정
            lineWidth={4}
            enablePoints={false}
            enableCrosshair={false}
            useMesh={true}
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
                  {data.point.serieId} : {data.point.data.y}
                </div>
              );
            }}
          />
        </div>
      </Link>
    </div>
  );
};

export default NtwCreateBlock;
