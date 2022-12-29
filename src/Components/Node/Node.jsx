import React, { useEffect, useState } from "react";
import "./Node.scss";
import Footer from "../Footer/Footer";
import { db } from "../../firebase";
import { collection, getDocs } from 'firebase/firestore';

const Node = () => {

  const nodeCollection = collection(db, "node1");

  const [nodeInfo, setNodeInfo] = useState([]);

  useEffect(() => {
    async function getNodes() {
      const data = await getDocs(nodeCollection);
      setNodeInfo(
        data.docs.map((item) => {
          return item.data();
        })
      )
  };
    getNodes();
  }, []);


  return (
    <div className="Node">
      
        <div>
          <h1>노드</h1>
          <h3><span><b>|</b></span> 전체 노드 6개</h3>
          <table>
            <thead>
              <tr>
                <th>서비스명</th>
                <th>상태</th>
                <th>노드명</th>
                <th>유형</th>
                <th>서비스명</th>
                <th>IP</th>
                <th>최신블록번호</th>
                <th>최신블록시간</th>
                <th>처리속도(TPS)</th>
                <th>지연율(Latency)</th>
              </tr>
            </thead>
            <tbody>
              {
                nodeInfo.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.service}</td>
                    <td>{item.ndstatus}</td>
                    <td>{item.nodename}</td>
                    <td>{item.ndtype}</td>
                    <td>{item.service_dcc}</td>
                    <td>{item.ipaddress}</td>
                    <td>{item.blocknum}</td>
                    <td>{item.createdt}</td>
                    <td>{item.tps}</td>
                    <td>{item.latency}</td>
                  </tr>   
                ))
              }
            </tbody>
          </table>
          
        </div>
      
      <Footer />
    </div>
  );
};

export default Node;
