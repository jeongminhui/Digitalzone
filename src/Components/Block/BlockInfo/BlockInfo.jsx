import React, { useState } from "react";
import "./BlockInfo.scss";
import Footer from "../../Footer/Footer";
import { async } from "@firebase/util";
import { collection, getDoc, doc, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../../../firebase";
import { Link, useNavigate, useParams } from "react-router-dom";
import TxInfo from "./TxInfo";
import Carousel from "./Carousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLocation } from "react-router-dom";

const BlockInfo = () => {
  const { blocknum } = useParams();
  const blockCollection = collection(db, "block");
  const txCollection = collection(db, "transaction");
  const [blockInfo, setBlockInfo] = useState({});
  const [txInfo, setTxInfo] = useState({});
  const [visible, setVisible] = useState(false);
  const [block, setBlock] = useState([]);

  useEffect(() => {
    console.log(blocknum);
    async function getBlockInfo() {
      //블록 전체 정보 로드
      const blkdata = await getDocs(blockCollection);
      const arr = blkdata.docs.map((items) => {
        return items.data();
      });
      setBlock(arr);

      // 블록 상세 정보 로드
      const docRef = doc(blockCollection, blocknum);
      const data = await getDoc(docRef);
      setBlockInfo(data.data());

      // 트랜잭션 상세 정보 로드
      const txRef = doc(txCollection, String(blockInfo.txnum));
      const txdata = await getDoc(txRef);
      setTxInfo(txdata.data());
    }
    getBlockInfo();
  }, [blocknum]);

  const txInfoHandler = () => {
    setVisible(!visible);
  };

  return (
    <div className="BlockInfo">
      <h1 className="mainTitle">블록</h1>
      <h3 className="subTitle">
        <span className="subBar">|</span> 블록 상세
      </h3>

      <Carousel blocknum={blocknum} block={block} />

      <table>
        <tbody>
          <tr>
            <td className="infoTitle">서비스명</td>
            <td className="infoContent">{blockInfo.service}</td>
          </tr>
          <tr>
            <td className="infoTitle">블록번호</td>
            <td className="infoContent">{blockInfo.blocknum}</td>
          </tr>
          <tr>
            <td className="infoTitle">타임스탬프</td>
            <td className="infoContent">{blockInfo.createdt}</td>
          </tr>
          <tr>
            <td className="infoTitle">블록해시</td>
            <td className="infoContent">{blockInfo.blockhash}</td>
          </tr>
          <tr>
            <td className="infoTitle">블록크기</td>
            <td className="infoContent">{blockInfo.blksize}</td>
          </tr>
          <tr>
            <td className="infoTitle">트랜잭션 수</td>
            <td className="infoContent">
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
