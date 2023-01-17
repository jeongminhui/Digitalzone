import React, { useEffect, useState, useRef } from "react";
import { db } from "../../../firebase";
import "./TranInfo.scss";
import "../../../App.scss";
import Footer from "../../Footer/Footer";
import { collection, getDoc, doc } from "firebase/firestore";
import copy from "copy-to-clipboard";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { Link, useParams, useNavigate } from "react-router-dom";
import { currentBlockAtom } from "../../../Recoil/Atom";
import { useRecoilState } from "recoil";
import { useRecoilValue } from "recoil";
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

const TranInfo = () => {
  const { txnum } = useParams();
  const [transactionInfo, setTransactionInfo] = useState([]);
  const [copyBtn, setCopyBtn] = useState("COPY");
  const transactionCollection = collection(db, "transaction");
  const navigate = useNavigate();
  // recoil Atom에서 가져오기
  const [currentBlock, setCurrentBlock] = useRecoilState(currentBlockAtom);

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
    setCopyBtn("COPIED");
    btnRef.current.style.color = "#fff";
    btnRef.current.style.backgroundColor = "#4669F5";
    btnRef.current.style.width = "75px";
  }

  //블록번호 클릭시 블록페이지로 이동
  const clickBlockHandler = () => {
    setCurrentBlock(transactionInfo.id - 1);
    navigate(`/block/${transactionInfo.blocknum}`);
  };

  return (
    <div className="TranInfo">
      <div className="wrap">
        <h1 className="mainTitle">트랜잭션</h1>
        <div className="subTitle">
          <h3 className="detailInfoTitle">
            {" "}
            <span className="subBar">|</span> 상세정보
          </h3>
          <Link to="/transaction">
            <button className="listBtn">목록으로</button>
          </Link>
        </div>
        <div className="tableWrap detailInfoBox">
          <table>
            <thead></thead>
            <tbody>
              <tr>
                <td className="infoTitle">서비스명</td>
                <td className="infoContent">{transactionInfo.service}</td>
              </tr>
              <tr>
                <td className="infoTitle">타임스탬프</td>
                <td className="infoContent">{transactionInfo.createdt}</td>
              </tr>
              <tr>
                <td className="infoTitle">트랜잭션 해시</td>
                <td className="infoContent">{transactionInfo.txhash}</td>
                <td>
                  <button
                    className="copyButton"
                    style={{ color: "#3598D9" }}
                    ref={btnRef}
                    onClick={() => {
                      copyButton();
                      changeBtnText();
                    }}
                  >
                    {copyBtn}
                    {copyBtn === "COPIED" ? (
                      <HiOutlineDocumentDuplicate
                        className="icon"
                        style={{ stroke: "#fff" }}
                      />
                    ) : (
                      <HiOutlineDocumentDuplicate
                        className="icon"
                        style={{ stroke: "#3598d9" }}
                      />
                    )}
                  </button>
                </td>
              </tr>
              <tr>
                <td className="infoTitle">트랜잭션 크기</td>
                <td className="infoContent">{transactionInfo.txsize}</td>
              </tr>
              <tr>
              <Tooltip title="Add" arrow>
                <td className="infoTitle">블록번호</td>
                <td
                  className="infoContent"
                  onClick={() => clickBlockHandler()}
                  style={{ cursor: "pointer" }}
                >
                  {transactionInfo.blocknum}
                </td>
                </Tooltip>
              </tr>
              <tr>
                <td className="infoTitle">요청시간</td>
                <td className="infoContent">{transactionInfo.requiretime}</td>
              </tr>
              <tr>
                <td className="infoTitle">API 종류</td>
                <td className="infoContent">{transactionInfo.apitype}</td>
              </tr>
              <tr>
                <td className="infoTitle">노드명</td>
                <td className="infoContent">{transactionInfo.nodename}</td>
              </tr>
              <tr>
                <td className="infoTitle">상태</td>
                <td className="infoContent">{transactionInfo.status}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="txdataWrap">
          {JSON.stringify(transactionInfo.txdata, null, 10)}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TranInfo;
