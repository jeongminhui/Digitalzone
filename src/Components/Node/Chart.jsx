import React, { useContext } from "react";
import ApexCharts from "react-apexcharts";
import { ThemeContext } from "../Context/ThemeContext";
import "./Chart.scss";

const Chart = () => {
  // 다크모드
  const darkmodeTheme = useContext(ThemeContext);
  const darkmode = darkmodeTheme.isDarkMode;

  return (
    <div>
      <div className="Wrap">
        <div className="ChartVol">
          <ApexCharts
            series={[
              { name: "network1", data: [21, 40, 28, 71, 42, 96, 10] },
              {
                name: "network2",
                data: [11, 62, 45, 2, 34, 52, 41],
              },
              {
                name: "network3",
                data: [79, 5, 25, 43, 9, 45, 21],
              },
            ]}
            options={{
              grid: {
                padding: {
                  top: 30,
                  bottom: 30,
                  left: 50,
                  right: 50,
                },
              },
              chart: {
                type: "area",
                toolbar: {
                  show: false,
                },
              },
              dataLabels: {
                enabled: false,
              },
              stroke: {
                curve: "smooth",
              },
              title: {
                text: "Received Network Traffic per Container",
                align: "center",
                style: {
                  color: darkmode ? "var(--bg-color)" : "#000000",
                },
              },
              xaxis: {
                categories: [
                  "15:30",
                  "15:40",
                  "15:50",
                  "16:00",
                  "16:10",
                  "16:20",
                  "16:30",
                ],
                labels: {
                  style: {
                    fontSize: "12px",
                    colors: darkmode ? "var(--bg-color)" : "#000000",
                    fontFamily: 'Noto Sans KR", sans-serif',
                  },
                },
              },
              yaxis: {
                labels: {
                  style: {
                    fontSize: "12px",
                    colors: darkmode ? "var(--bg-color)" : "#000000",
                    fontFamily: 'Noto Sans KR", sans-serif',
                  },
                  offsetX: 20,
                },
              },
              legend: {
                labels: {
                  colors: darkmode ? "var(--bg-color)" : "#000000",
                },
                offsetY: -10,
              },
            }}
          ></ApexCharts>
        </div>
        <div className="ChartVol">
          <ApexCharts
            series={[
              { name: "network1", data: [32, 4, 82, 15, 42, 19, 99] },
              {
                name: "network2",
                data: [99, 35, 45, 29, 74, 25, 41],
              },
              {
                name: "network3",
                data: [9, 53, 25, 43, 29, 85, 11],
              },
            ]}
            options={{
              grid: {
                padding: {
                  top: 30,
                  bottom: 30,
                  left: 50,
                  right: 50,
                },
              },
              chart: {
                type: "area",
                toolbar: {
                  show: false,
                },
              },
              dataLabels: {
                enabled: false,
              },
              stroke: {
                curve: "smooth",
              },
              title: {
                text: "Sent Network Traffic per Container",
                align: "center",
                style: {
                  color: darkmode ? "var(--bg-color)" : "#000000",
                },
              },
              xaxis: {
                categories: [
                  "15:30",
                  "15:40",
                  "15:50",
                  "16:00",
                  "16:10",
                  "16:20",
                  "16:30",
                ],
                labels: {
                  style: {
                    fontSize: "12px",
                    colors: darkmode ? "var(--bg-color)" : "#000000",
                    fontFamily: 'Noto Sans KR", sans-serif',
                  },
                },
              },
              yaxis: {
                labels: {
                  style: {
                    fontSize: "12px",
                    colors: darkmode ? "var(--bg-color)" : "#000000",
                    fontFamily: 'Noto Sans KR", sans-serif',
                  },
                  offsetX: 20,
                },
              },
              legend: {
                labels: {
                  colors: darkmode ? "var(--bg-color)" : "#000000",
                },
                offsetY: -10,
              },
            }}
          ></ApexCharts>
        </div>
        <div className="ChartVol">
          <ApexCharts
            series={[{ name: "RSS", data: [60, 41, 35, 51, 49, 62, 91] }]}
            options={{
              grid: {
                padding: {
                  top: 30,
                  bottom: 30,
                  left: 50,
                  right: 50,
                },
              },
              chart: {
                type: "line",
                zoom: {
                  enabled: false,
                },
                toolbar: {
                  show: false,
                },
              },
              dataLabels: {
                enabled: false,
              },
              stroke: {
                curve: "straight",
              },
              title: {
                text: "RSS Memory Usage per Container",
                align: "center",
                style: {
                  color: darkmode ? "var(--bg-color)" : "#000000",
                },
              },
              xaxis: {
                categories: [
                  "15:30",
                  "15:40",
                  "15:50",
                  "16:00",
                  "16:10",
                  "16:20",
                  "16:30",
                ],
                labels: {
                  style: {
                    fontSize: "12px",
                    colors: darkmode ? "var(--bg-color)" : "#000000",
                    fontFamily: 'Noto Sans KR", sans-serif',
                  },
                },
              },
              yaxis: {
                labels: {
                  style: {
                    fontSize: "12px",
                    colors: darkmode ? "var(--bg-color)" : "#000000",
                    fontFamily: 'Noto Sans KR", sans-serif',
                  },
                  offsetX: 20,
                },
              },
            }}
          ></ApexCharts>
        </div>
        <div className="ChartVol">
          <ApexCharts
            series={[{ name: "CPU", data: [28, 41, 35, 51, 49, 79, 91] }]}
            options={{
              grid: {
                padding: {
                  top: 30,
                  bottom: 30,
                  left: 50,
                  right: 50,
                },
              },
              chart: {
                type: "line",
                zoom: {
                  enabled: false,
                },
                toolbar: {
                  show: false,
                },
              },
              dataLabels: {
                enabled: false,
              },
              stroke: {
                curve: "straight",
              },
              title: {
                text: "CPU Usage per Container",
                align: "center",
                style: {
                  color: darkmode ? "var(--bg-color)" : "#000000",
                },
              },
              xaxis: {
                categories: [
                  "15:30",
                  "15:40",
                  "15:50",
                  "16:00",
                  "16:10",
                  "16:20",
                  "16:30",
                ],
                labels: {
                  style: {
                    fontSize: "12px",
                    colors: darkmode ? "var(--bg-color)" : "#000000",
                    fontFamily: 'Noto Sans KR", sans-serif',
                  },
                },
              },
              yaxis: {
                labels: {
                  style: {
                    fontSize: "12px",
                    colors: darkmode ? "var(--bg-color)" : "#000000",
                    fontFamily: 'Noto Sans KR", sans-serif',
                  },
                  offsetX: 20,
                },
              },
            }}
          ></ApexCharts>
        </div>
      </div>
    </div>
  );
};

export default Chart;
