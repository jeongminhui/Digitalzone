import React, { useEffect, useState } from "react";
import "./Node.scss";
import Footer from "../Footer/Footer";
import { db } from "../../firebase";
import { collection, getDocs } from 'firebase/firestore';
import Tab from './Tab';


const Node = () => {

  const nodeCollection = collection(db, "node1");
  const [rows, setRows] = useState([]);
 

  useEffect(() => {
    async function getNodes() {
      const data = await getDocs(nodeCollection);
      data.docs.map((items) => {
        return makeNodeData(items.data());
      });
    }
    getNodes();
  }, []);


  // row 구조
  const makeNodeData = (item) => {
    setRows((prev) => [
      ...prev,
      {
        service: item.service,
        ndstatus: item.ndstatus,
        nodename: item.nodename,
        ndtype: item.ndtype,
        service_dcc: item.service_dcc,
        ipaddress: item.ipaddress,
        blocknum: item.blocknum,
        createdt: item.createdt,
        tps: item.tps,
        latency: item.latency,
      },
    ]);
  };



  return (
    <div className="Node">
      
        <div>
          <h1>노드</h1>
          <h3><span className='subBar'>|</span> 전체 노드 {rows.length}개</h3>

          <Tab rows={rows}/>
          
        </div>
      
      <Footer />
    </div>
  );
};

export default Node;
