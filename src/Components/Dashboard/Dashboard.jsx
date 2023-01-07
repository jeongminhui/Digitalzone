import React, { useEffect } from "react";
import "./Dashboard.scss";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";

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
  const blockData = collection(db, "block");
  useEffect(() => {
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
  const transactionData = collection(db, "transaction");

  useEffect(() => {
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
  const ntwData = collection(db, "ntwdata");

  useEffect(() => {
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
  const serviceData = collection(db, "service");

  useEffect(() => {
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
      <div>
        <Link to="/block">
          <TotalBlock />
        </Link>
        <Link to="/transaction">
          <TotalTransaction />
        </Link>
        <Link to="/node">
          <ActiveNetwork />
        </Link>
        <Link to="/service">
          <TotalService />
        </Link>
      </div>
      <div>
        <Link to="/transaction">
          <NtwTPS />
        </Link>
        <Link to="/block">
          <NtwCreateBlock />
        </Link>
        <Link to="/service">
          <EnrollService />
        </Link>
        <Link to="/service">
          <NtwActiveService />
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
