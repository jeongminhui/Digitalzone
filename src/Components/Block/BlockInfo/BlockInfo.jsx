import React, { useState } from "react";
import "./BlockInfo.scss";
import Footer from "../../Footer/Footer";
import { async } from "@firebase/util";
import { collection, getDoc, doc } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../../../firebase";
import { useParams } from "react-router-dom";
import TxInfo from "./TxInfo";

const BlockInfo = () => {
  const { blocknum } = useParams();
  const blockCollection = collection(db, "block");
  const txCollection = collection(db, "transaction");
  const [blockInfo, setBlockInfo] = useState({});
  const [txInfo, setTxInfo] = useState({});
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    async function getBlockInfo() {
      const docRef = doc(blockCollection, blocknum);
      const data = await getDoc(docRef);
      setBlockInfo(data.data());
    }
    getBlockInfo();
  }, []);

  const txInfoHandler = () => {
    setVisible(!visible);

    async function getTxInfo() {
      const docRef = doc(txCollection, String(blockInfo.txnum));
      const data = await getDoc(docRef);
      setTxInfo(data.data());
    }
    getTxInfo();
  };

  return (
    <div className="BlockInfo">
      <h1>블록 상세정보 페이지 입니다</h1>
      <table>
        <tbody>
          <tr>
            <td>서비스명</td>
            <td>{blockInfo.service}</td>
          </tr>
          <tr>
            <td>블록번호</td>
            <td>{blockInfo.blocknum}</td>
          </tr>
          <tr>
            <td>타임스탬프22</td>
            <td>{blockInfo.createdt}</td>
          </tr>
          <tr>
            <td>블록해시</td>
            <td>{blockInfo.blockhash}</td>
          </tr>
          <tr>
            <td>블록크기</td>
            <td>{blockInfo.blksize}</td>
          </tr>
          <tr>
            <td>트랜잭션 수</td>
            <td>
              1
              <button type="button" onClick={txInfoHandler}>
                자세히
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      {visible ? <TxInfo txInfo={txInfo} /> : ""}

      <Footer />
    </div>
  );
};

export default BlockInfo;
