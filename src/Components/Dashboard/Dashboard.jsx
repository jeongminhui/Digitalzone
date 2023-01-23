import React, { useEffect } from "react";
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

const Dashboard = () => {
  // 블록 데이터
  const [block, setBlock] = useRecoilState(blockAtom);
  useEffect(() => {
    const blockData = collection(db, "block");
    async function getNtw() {
      const data = await getDocs(blockData);
      const dataArr = data.docs.map((item) => {
        return item.data();
      });
      setBlock(dataArr);
    }
    getNtw();
  }, []);

  // 트랜잭션 데이터
  const [transaction, setTransaction] = useRecoilState(transactionAtom);

  useEffect(() => {
    const transactionData = collection(db, "transaction");
    async function getNtw() {
      const data = await getDocs(transactionData);
      const dataArr = data.docs.map((item) => {
        return item.data();
      });
      setTransaction(dataArr);
    }
    getNtw();
  }, []);

  // 네트워크 데이터
  const [network, setNetwork] = useRecoilState(networkAtom);

  useEffect(() => {
    const ntwData = collection(db, "ntwdata");
    async function getNtw() {
      const data = await getDocs(ntwData);
      const dataArr = data.docs.map((item) => {
        return item.data();
      });
      setNetwork(dataArr);
    }
    getNtw();
  }, []);

  // 서비스 데이터
  const [service, setService] = useRecoilState(serviceAtom);

  useEffect(() => {
    const serviceData = collection(db, "service");
    async function getNtw() {
      const data = await getDocs(serviceData);
      const dataArr = data.docs.map((item) => {
        return item.data();
      });
      setService(dataArr);
    }
    getNtw();
  }, []);

  return (
    <div className="Dashboard">
      <div className="DashboardInfo">
        <div className="Dashboard_container1">
          <TotalBlock />
          <TotalTransaction />
          <ActiveNetwork />
          <TotalService />
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
