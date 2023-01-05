import React, {useEffect, useState, useRef} from "react";
import { Component } from 'react'
import ApexCharts from "react-apexcharts";
import { db } from "../../../firebase";
import {
    collection,
    getDoc,
    getDocs,
    doc,
    where,
    updateDoc,
    deleteDoc,
  } from "firebase/firestore";

const ApexLeft = () => {
    const [transactionInfo, setTransactionInfo] = useState([]);
    const [rows, setRows] = useState([]);

    const transaction_testCollection = collection(db, "transaction");

  useEffect(() => {
    async function getTrans() {
      const data = await getDocs(transaction_testCollection);
      data.docs.map((items) => {
        return makeChartDatas(items.data());
      })
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

// const timeFilter = makeChartDatas.filter(ChartData=> ChartData.createdt.slice(12,14) ==="11")
// console.log (timeFilter);

  return (
    <div>
      <ApexCharts
        type="area"
        series={[
          { name: "오늘의 기온", data: [19, 26, 20, 9] },
          { name: "내일의 기온", data: [30, 26, 34, 10] },
        ]}
        options={{
          chart: {
            height: 100,
            width: 300,
          },
        }}
      ></ApexCharts>
    </div>
  );
};
export default ApexLeft;
