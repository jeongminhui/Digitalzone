import React, { useEffect, useState, useRef } from "react";
import { db } from "../../../firebase";
import "./TranInfo.scss";
import Footer from "../../Footer/Footer";
import {
  collection,
  getDoc,
  getDocs,
  doc,
  where,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import copy from "copy-to-clipboard";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { useParams } from "react-router-dom";

const TranInfo = () => {
  const { txnum } = useParams();
  const [transactionInfo, setTransactionInfo] = useState([]);
  const [copyBtn, setCopyBtn] = useState("copy");
  const transactionCollection = collection(db, "transaction");

  //트랜잭션 상세 정보 로드
  useEffect(() => {
    async function getTrans() {
      const docRef = doc(transactionCollection, txnum);
      const data = await getDoc(docRef);
      setTransactionInfo(data.data());
      // console.log(transactionInfo);
    }
    getTrans();
  }, []);

  // 카피 기능
  function copyButton() {
    copy(transactionInfo.txhash, {
      debug: true,
      message: "Press #{key} to copy",
    });
  }
  //카피버튼 클릭시 색변경 + 글자변경
  const btnRef = useRef();
  function changeBtnText() {
    setCopyBtn("copied");
    btnRef.current.style.color = "#fff";
    btnRef.current.style.backgroundColor = "#4669F5";
  }

  return (
    <div className="TranInfo">
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
            <td>
              <button
                className="copyButton"
                ref={btnRef}
                onClick={() => {
                  copyButton();
                  changeBtnText();
                }}
              >
                {copyBtn}
                {copyBtn === "copied" ? (
                  <HiOutlineDocumentDuplicate style={{ stroke: "#fff" }} />
                ) : (
                  <HiOutlineDocumentDuplicate style={{ stroke: "#4669F5" }} />
                )}
              </button>
            </td>
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
      <Footer />
    </div>
  );
};

export default TranInfo;
