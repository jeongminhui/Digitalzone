import React, { useEffect, useState, useRef } from "react";
import "./Transaction.scss";
import Footer from "../Footer/Footer";
import TranMain from "./TranMain/TranMain";
import TranInfo from "./TranInfo/TranInfo";
import { db } from "../../firebase";
import { collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

// recoil Atom에서 가져오기
import { useRecoilValue } from "recoil";
import { transactionSelector } from "../../Recoil/Selector";

const Transaction = () => {
  const transactionData = useRecoilValue(transactionSelector);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    //row구조
    transactionData.map((item) => {
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
    });
  }, []);

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
      <div className="wrapper">
        <TranMain rows={rows} clickHandler={clickHandler} />
      </div>
      <Footer />
    </div>
  );
};

export default Transaction;
