import React, { useContext, useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { ThemeContext } from "../../Context/ThemeContext";

const ChartLeft = () => {
  const [ten, setTen] = useState({});
  const [rows, setRows] = useState([]);

  // 다크모드
  const darkmodeTheme = useContext(ThemeContext);
  const darkmode = darkmodeTheme.isDarkMode;

  const transaction = collection(db, "transaction");

  const containerStyle = {
    width: "480px",
    height: "300px",
  };
  useEffect(() => {
    async function getTrans() {
      const data = await getDocs(transaction);
      data.docs.map((items) => {
        return makeChartDatas(items.data());
      });
      //   console.log(transactionInfo);
    }
    getTrans();
  }, []);

  const makeChartDatas = (item) => {
    setRows((prev) => [
      ...prev,
      {
        createdt: item.createdt,
        txsize: item.txsize,
      },
    ]);
  };
  //  console.log(rows);

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
    setTen({
      ten: timeFilter10.length,
      eleven: timeFilter11.length,
      twelve: timeFilter12.length,
      thirteen: timeFilter13.length,
      fourteen: timeFilter14.length,
    });
  }, [rows]);
  return (
    <div className="chart" style={containerStyle}>
      <ApexCharts
        type="area"
        series={[
          {
            name: "시간당 트랜잭션 수(개)",
            data:
              Object.keys(ten).length > 4
                ? [ten.ten, ten.eleven, ten.twelve, ten.thirteen, ten.fourteen]
                : [0],
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
          dataLabels: {
            enabled: false,
          },
          title: {
            text: "시간당 트랜잭션 수(개)",
            align: "center",
            style: {
              color: darkmode ? "var(--bg-color)" : "#000000",
              fontSize: "16px",
              fontWeight: "900",
              fontFamily: 'Noto Sans KR", sans-serif',
            },
          },
          stroke: {
            //선의 커브를 부드럽게 하고, 두께를 3으로 지정
            curve: "smooth",
            width: 3,
          },
          xaxis: {
            categories: ["10:00", "11:00", "12:00", "13:00", "14:00"],
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
            },
          },
        }}
      ></ApexCharts>
    </div>
  );
};
export default ChartLeft;
