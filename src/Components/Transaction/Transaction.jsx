import React, { useEffect, useState, useRef } from "react";
import "./Transaction.scss";
import Footer from "../Footer/Footer";
import TranMain from "./TranMain/TranMain";
import TranInfo from "./TranInfo/TranInfo";
import { db } from "../../firebase";
import {
  collection,
  getDoc,
  getDocs,
  doc,
  where,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Transaction = () => {
  const transactionCollection = collection(db, "transaction_test");
  const [transactionInfo, setTransactionInfo] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function getTrans() {
      // const docRef = doc(transactionCollection, "326849");
      const data = await getDocs(transactionCollection);
      data.docs.map((items) => {
        return makeTranData(items.data());
      });
    }
    // setTransactionInfo(transactionData);
    // console.log(transactionInfo);
    getTrans();
  }, []);

  //row구조
  const makeTranData = (item) => {
    setRows((prev) => [
      ...prev,
      {
        service: item.service,
        txnum: item.txnum,
        createdt: item.createdt,
        txhash: item.txhash,
        txsize: item.txsize,
        blocknum: item.blocknum,
      },
    ]);
  };

  // navigation 트랜잭션 상세 이동
  const [txnum, setTxnum] = useState("");
  const navigate = useNavigate();

  const clickHandler = (txnum) => {
    navigate(`/transaction/${txnum}`);
  };

  useEffect(() => {
    navigate(`/transaction/${txnum}`);
  }, [txnum]);

  return (
    <div className="Transaction">
    
        <TranMain
          rows={rows}
          clickHandler={clickHandler}
        />
        <TranInfo/>
        <Footer />
      </div>
  );
};

export default Transaction;
