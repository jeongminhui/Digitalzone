import { fontWeight } from "@mui/system";
import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { serviceSelector } from "../../../Recoil/Selector";

const ServiceChartLeft = ({rows}) => {
  const serviceData = useRecoilValue(serviceSelector);
  const [service, setService] = useState({});

  useEffect(() => {
    const serviceFilterA = rows.filter((item) => item.service[0] === "A");
    const serviceFilterB = rows.filter((item) => item.service[0] === "B");
    const serviceFilterC = rows.filter((item) => item.service[0] === "C");
    const serviceFilterD = rows.filter((item) => item.service[0] === "D");
    const serviceFilterE = rows.filter((item) => item.service[0] === "E");
    setService({
      A: serviceFilterA.length,
      B: serviceFilterB.length,
      C: serviceFilterC.length,
      D: serviceFilterD.length,
      E: serviceFilterE.length,
    });
  }, [rows]);

  return (
    <div className="leftChart" >
      <ApexCharts
         type="bar"
        series={[
          {
            name: "누적 호출 상위 Top5",
            data:  Object.keys(service).length > 4
            ? [service.A, service.B, service.C, service.D, service.E] : [0],
          },
        ]}
        options={{
          fill: {
            colors: ['#1A90FC']
          },
          chart: {
            height: 300,
            width: 500,
            toolbar: {
              show: false,
            },
          },
          dataLabels: {
            enabled: false,
          },
          title: {
            text: "누적 호출 상위 Top5",
            align: "center",
            style: {
              fontSize:"16px",
              fontWeight:"900",
              fontFamily: 'Noto Sans KR", sans-serif',
            },
          },
          plotOptions: {
            bar: {
              borderRadius: 1,
               horizontal: false,
               columnWidth: '30%',
            },
          },
          
          xaxis: {
            categories: ["A서비스", "B서비스", "C서비스", "D서비스", "E서비스"],
            // position: "bottom",
            labels: {
              show: true,
              // rotate: 0,
              style: {
                fontSize: "11px",
                  colors: [],
                  fontFamily: 'Noto Sans KR", sans-serif',
              },
              },
           
          },
          dataLabels: {
            enabled: false,
          },
        }}
      ></ApexCharts>
    </div>
  );
};

export default ServiceChartLeft;
