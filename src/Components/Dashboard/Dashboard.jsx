import React, { useEffect, useState } from "react";
import "./Dashboard.scss";
import DashboardInfo from "./DashboardInfo";
import DashboardChart from "./DashboardChart";
import Footer from "../Footer/Footer";
import { db } from "./../../firebase";
import { collection, getDocs } from "firebase/firestore";

const Dashboard = () => {
  ///////////// node정보 ////////////////
  const dashboard_nodeCollection = collection(db, "node");
  const [network, setNetwork] = useState({
    allNetwork: "",
    activeNetwork: "",
    // activeNetworkArr: "",
  });

  useEffect(() => {
    async function getNode() {
      const nodeData = await getDocs(dashboard_nodeCollection);
      const active = nodeData.docs.filter((items) => {
        return items.data().ndstatus === "활성화";
      });

      // const activeArr = active.map((items) => {
      //   return items.data();
      // });

      setNetwork({
        ...network,
        allNetwork: nodeData.docs.length,
        activeNetwork: active.length,
        // activeNetworkArr: [...activeArr],
      });
    }
    getNode();
  }, []);

  ////////// service정보 ///////////
  const dashboard_serviceCollection = collection(db, "service");
  const [service, setService] = useState({});

  useEffect(() => {
    async function getService() {
      const serviceData = await getDocs(dashboard_serviceCollection);
      const serviceAll = serviceData.docs.map((items) => {
        return [items.data()];
      });
      //////////////////////////////////////////////////////////////////////////////// return 부터 다시
      setService({ serviceAll });
    }
    getService();
  }, []);

  return (
    <div className="Dashboard">
      <DashboardInfo networkData={network} serviceData={service} />
      <DashboardChart networkData={network} serviceData={service} />
      <Footer />
    </div>
  );
};

export default Dashboard;
