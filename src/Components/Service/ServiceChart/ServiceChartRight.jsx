import React, { useContext, useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { serviceSelector } from "../../../Recoil/Selector";
import { ThemeContext } from "../../Context/ThemeContext";

const ServiceChartRight = ({ rows }) => {
  const serviceData = useRecoilValue(serviceSelector);
  const [apiType, setapiType] = useState({});

  // 다크모드
  const darkmodeTheme = useContext(ThemeContext);
  const darkmode = darkmodeTheme.isDarkMode;

  useEffect(() => {
    const apiFilter1 = rows.filter((item) => item.apitype === "인증서 등록");
    const apiFilter2 = rows.filter(
      (item) => item.apitype === "디지털 콘텐츠 검증"
    );
    const apiFilter3 = rows.filter(
      (item) => item.apitype === "디지털 콘텐츠 등록"
    );
    const apiFilter4 = rows.filter(
      (item) => item.apitype === "DID DOCUMENT 등록"
    );
    const apiFilter5 = rows.filter((item) => item.apitype === "IPFS 업로드");
    setapiType({
      A: apiFilter1.length,
      B: apiFilter2.length,
      C: apiFilter3.length,
      D: apiFilter4.length,
      E: apiFilter5.length,
    });
  }, [rows]);

  return (
    <div className="rightContainer">
      <ApexCharts
        type="bar"
        series={[
          {
            name: "API 호출 상위 Top5",
            data:
              Object.keys(apiType).length > 4
                ? [apiType.A, apiType.B, apiType.C, apiType.D, apiType.E]
                : [0],
          },
        ]}
        options={{
          fill: {
            colors: ["#FAAD29"],
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
            text: "API 호출 상위 Top5",
            align: "center",
            style: {
              color: darkmode ? "var(--bg-color)" : "#000000",
              fontSize: "16px",
              fontFamily: 'Noto Sans KR", sans-serif',
              fontWeight: "bold",
            },
          },
          plotOptions: {
            bar: {
              borderRadius: 1,
              horizontal: false,
              columnWidth: "30%",
            },
          },

          xaxis: {
            categories: [
              "인증서등록",
              `콘텐츠검증`,
              `콘텐츠등록 `,
              `DID DOCU등록`,
              `IPFS업로드`,
            ],
            // position: "bottom",
            overwriteCategories: undefined,
            labels: {
              show: true,
              // rotate: 0,
              style: {
                fontSize: "11px",
                colors: darkmode ? "var(--bg-color)" : "#000000",
                fontFamily: 'Noto Sans KR", sans-serif',
              },
            },
          },
          yaxis: {
            // width: "-10%",
            labels: {
              style: {
                fontSize: "12px",
                colors: darkmode ? "var(--bg-color)" : "#000000",
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

export default ServiceChartRight;
