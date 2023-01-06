import React, { useEffect, useState } from "react";
import "./Service.scss";
import Footer from "../Footer/Footer";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import ServiceTable from "./ServiceTable";

const Service = () => {
  // const blockCollection = collection(db, "service");
  // const [rows, setRows] = useState([]);

  // useEffect(() => {
  //   async function getService() {
  //     const data = await getDocs(blockCollection);
  //     data.docs.map((items) => {
  //       return makeServiceData(items.data());
  //     });
  //   }
  //   getBlocks();
  // }, []);

  return (
    <div className="Service">
      <div className="wrapper">
        <h1 className="mainTitle">서비스</h1>
        <h3 className="subTitle">
          <span className="subBar">|</span> 전체 발급 {}건
        </h3>

        <ServiceTable />
      </div>
      <Footer />
    </div>
  );
};

export default Service;
