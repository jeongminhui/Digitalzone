import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import "./Dashboard.scss";

// Firebase
import { db } from "./../../firebase";
import { collection, getDocs } from "firebase/firestore";

// DashboardInfo
import TotalBlock from "./DashboardInfo/TotalBlock";
import TotalTransaction from "./DashboardInfo/TotalTransaction";
import ActiveNetwork from "./DashboardInfo/ActiveNetwork";
import TotalService from "./DashboardInfo/TotalService";
import NtwTPS from "./DashboardInfo/NtwTPS";
import NtwCreateBlock from "./DashboardInfo/NtwCreateBlock";
import EnrollService from "./DashboardInfo/EnrollService";
import NtwActiveService from "./DashboardInfo/NtwActiveService";

// recoil Atom에서 가져오기
import { useRecoilState } from "recoil";
import { blockAtom } from "../../Recoil/Atom";
import { transactionAtom } from "../../Recoil/Atom";
import { networkAtom } from "../../Recoil/Atom";
import { serviceAtom } from "../../Recoil/Atom";
import { ConstructionOutlined } from "@mui/icons-material";
import { Ticks } from "chart.js";

const Dashboard = () => {
  // 날짜 시간 데이터
  const now = new Date();
  const year = now.getFullYear();
  const month = ("0" + now.getMonth() + 1).slice(-2);
  const date = ("0" + now.getDate()).slice(-2);
  const hour = ("0" + now.getHours()).slice(-2);
  const min = ("0" + now.getMinutes()).slice(-2);
  const sec = ("0" + now.getSeconds()).slice(-2);
  const DateTime = `${year}-${month}-${date} ${hour}:${min}:${sec}`;

  // // 블록 데이터
  // const [block, setBlock] = useRecoilState(blockAtom);
  // const blockData = collection(db, "block");
  // useEffect(() => {
  //   async function getNtw() {
  //     const data = await getDocs(blockData);
  //     const dataArr = data.docs.map((item) => {
  //       return item.data();
  //     });
  //     setBlock(dataArr);
  //   }
  //   getNtw();
  // }, []);

  // // 트랜잭션 데이터
  // const [transaction, setTransaction] = useRecoilState(transactionAtom);
  // const transactionData = collection(db, "transaction");

  // useEffect(() => {
  //   async function getNtw() {
  //     const data = await getDocs(transactionData);
  //     const dataArr = data.docs.map((item) => {
  //       return item.data();
  //     });
  //     setTransaction(dataArr);
  //   }
  //   getNtw();
  // }, []);

  // // 네트워크 데이터
  // const [network, setNetwork] = useRecoilState(networkAtom);
  // const ntwData = collection(db, "ntwdata");

  // useEffect(() => {
  //   async function getNtw() {
  //     const data = await getDocs(ntwData);
  //     const dataArr = data.docs.map((item) => {
  //       return item.data();
  //     });
  //     setNetwork(dataArr);
  //   }
  //   getNtw();
  // }, []);

  // // 서비스 데이터
  // const [service, setService] = useRecoilState(serviceAtom);
  // const serviceData = collection(db, "service");

  // useEffect(() => {
  //   async function getNtw() {
  //     const data = await getDocs(serviceData);
  //     const dataArr = data.docs.map((item) => {
  //       return item.data();
  //     });
  //     setService(dataArr);
  //   }
  //   getNtw();
  // }, []);

  return (
    <div className="Dashboard">
      <div className="DashboardInfo">
        <div className="Dashboard_container1">
          <TotalBlock DateTime={DateTime} />
          <TotalTransaction DateTime={DateTime} />
          <ActiveNetwork DateTime={DateTime} />
          <TotalService DateTime={DateTime} />
        </div>
        <div className="Dashboard_container2">
          <NtwTPS />
          <NtwCreateBlock />
          <EnrollService />
          <NtwActiveService />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
