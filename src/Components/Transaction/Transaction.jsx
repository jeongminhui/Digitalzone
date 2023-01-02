import "./Transaction.scss";
import Footer from "../Footer/Footer";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDoc,
  getDocs,
  doc,
  query,
  where,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const Transaction = () => {
  const [transactionInfo, setTransactionInfo] = useState([]);
  const transactionCollection = collection(db, "transaction");

  useEffect(() => {
    async function getTrans() {
      const docRef = doc(transactionCollection, "326849");
      const data = await getDoc(docRef);

      setTransactionInfo(data.data());
      console.log(transactionInfo);
    }
    getTrans();
  }, []);

  return (
    <div className="Transaction">
      <h1 className="mainTitle">트랜잭션</h1>
      <h3 className="subTitle"> 상세정보</h3>
      <table>
        <thead></thead>
        <tbody>
          <tr>
            <td classs="infoTitle">서비스명</td>
            <td className="infoContent">{transactionInfo.service}</td>
          </tr>
          <tr>
            <td classs="infoTitle">타임스탬프</td>
            <td className="infoContent">{transactionInfo.createdt}</td>
          </tr>
          <tr>
            <td classs="infoTitle">트랜잭션 해시</td>
            <td className="infoContent">{transactionInfo.txhash}</td>
          </tr>
          <tr>
            <td classs="infoTitle">트랜잭션 크기</td>
            <td className="infoContent">{transactionInfo.txsize}</td>
          </tr>
          <tr>
            <td classs="infoTitle">블록번호</td>
            <td className="infoContent">{transactionInfo.blocknum}</td>
          </tr>
          <tr>
            <td classs="infoTitle">요청시간</td>
            <td className="infoContent">{transactionInfo.requiretime}</td>
          </tr>
          <tr>
            <td classs="infoTitle">API 종류</td>
            <td className="infoContent">{transactionInfo.apitype}</td>
          </tr>
          <tr>
            <td classs="dataTitle">노드명</td>
            <td className="infoContent">{transactionInfo.nodename}</td>
          </tr>
          <tr>
            <td classs="dataTitle">상태</td>
            <td className="infoContent">{transactionInfo.status}</td>
          </tr>
        </tbody>
      </table>

      <div className="txdataContainer">
        {JSON.stringify(transactionInfo.txdata, null, 10)}
      </div>
    </div>
  );
};

export default Transaction;
