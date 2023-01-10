import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";

const BlockChartRight = ({ rows, containerStyle }) => {
  const [avr, setAvr] = useState({});
  const [sum, setSum] = useState({
    ten: 0,
    eleven: 0,
    tewlve: 0,
    thirteen: 0,
    fourteen: 0,
  });

  useEffect(() => {
    const timeFilter10 = rows.filter(
      (item) => item.createdt.slice(11, 13) === "10"
    );
    const timeFilter11 = rows.filter(
      (item) => item.createdt.slice(11, 13) === "11"
    );
    const timeFilter12 = rows.filter(
      (item) => item.createdt.slice(11, 13) === "12"
    );
    const timeFilter13 = rows.filter(
      (item) => item.createdt.slice(11, 13) === "13"
    );
    const timeFilter14 = rows.filter(
      (item) => item.createdt.slice(11, 13) === "14"
    );

    const tenBlksize = timeFilter10.map((item) => {
      setSum({ ten: (sum.ten += parseInt(item.blksize)) });
    });
    const elevenBlksize = timeFilter11.map((item) => {
      setSum({ eleven: (sum.eleven += parseInt(item.blksize)) });
    });
    const tewlveBlksize = timeFilter12.map((item) => {
      setSum({ tewlve: (sum.tewlve += parseInt(item.blksize)) });
    });
    const thirteenBlksize = timeFilter13.map((item) => {
      setSum({ thirteen: (sum.thirteen += parseInt(item.blksize)) });
    });
    const fourteenBlksize = timeFilter14.map((item) => {
      setSum({ fourteen: (sum.fourteen += parseInt(item.blksize)) });
    });

    setAvr({
      ten: parseInt(sum.ten / timeFilter10.length),
      eleven: parseInt(sum.eleven / timeFilter11.length),
      twelve: parseInt(sum.tewlve / timeFilter12.length),
      thirteen: parseInt(sum.thirteen / timeFilter13.length),
      fourteen: parseInt(sum.fourteen / timeFilter14.length),
    });
  }, [rows]);

  console.log(avr);

  return (
    <div style={containerStyle}>
      <ApexCharts
        type="area"
        series={[
          {
            name: "평균 블록 크기 (KB)",
            data: [avr.ten, avr.eleven, avr.twelve, avr.thirteen, avr.fourteen],
          },
        ]}
        options={{
          chart: {
            height: 300,
            width: 500,
            toolbar: {
              show: false,
            },
          },
          title: {
            text: "평균 블록 크기 (KB)",
            align: "center",
          },
          stroke: {
            //선의 커브를 부드럽게 하고, 두께를 3으로 지정
            curve: "smooth",
            width: 3,
          },
          xaxis: {
            categories: ["10:00", "11:00", "12:00", "13:00", "14:00"],
          },
        }}
      ></ApexCharts>
    </div>
  );
};

export default BlockChartRight;
