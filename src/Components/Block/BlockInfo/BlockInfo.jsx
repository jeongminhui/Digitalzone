import React, { useEffect, useState, useRef } from "react";
import "./BlockInfo.scss";
import "../../../App.scss";
import Footer from "../../Footer/Footer";
import { async } from "@firebase/util";
import { collection, getDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";
import { Link, useParams } from "react-router-dom";
import TxInfo from "./TxInfo";
import Carousel from "./Carousel";
import copy from "copy-to-clipboard";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { GoTriangleUp } from "react-icons/go";
import { GoTriangleDown } from "react-icons/go";

// recoil로 불러오기
import { useRecoilValue } from "recoil";
import { currentBlockSelector } from "../../../Recoil/Selector";
import { blockSelector } from "../../../Recoil/Selector";

const BlockInfo = () => {
  const { blocknum } = useParams();

  const currentBlock = useRecoilValue(currentBlockSelector);
  const blockData = useRecoilValue(blockSelector);

  const blockCollection = collection(db, "block");
  const [blockInfo, setBlockInfo] = useState({});
  const [visible, setVisible] = useState(false);
  const [copyBtn, setCopyBtn] = useState("COPY");

  useEffect(() => {
    async function getBlockInfo() {
      // 블록 상세 정보 로드
      const docRef = doc(blockCollection, blocknum);
      const data = await getDoc(docRef);
      setBlockInfo(data.data());
    }
    getBlockInfo();
  }, [blocknum]);

  const txInfoHandler = () => {
    setVisible(!visible);
  };

  // 카피 기능
  function copyButton() {
    copy(blockInfo.blockhash, {
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
  }

  return (
    <div className="BlockInfo">
      <div className="wrap">
        <h1 className="mainTitle">블록</h1>
        <div className="subTitle">
          <h3 className="detailInfoTitle">
            {" "}
            <span className="subBar">|</span> 블록 상세
          </h3>
          <Link to="/block">
            <button className="listBtn">목록으로</button>
          </Link>
        </div>

        <Carousel
          blocknum={blocknum}
          block={blockData}
          currentBlock={currentBlock}
        />
        <div className="tableWrap detailInfoBox">
          <table className="table">
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
                      <HiOutlineDocumentDuplicate style={{ stroke: "#fff" }} />
                    ) : (
                      <HiOutlineDocumentDuplicate
                        style={{ stroke: "#3598d9" }}
                      />
                    )}
                  </button>
                </td>
              </tr>
              <tr>
                <td className="infoTitle">블록크기</td>
                <td className="infoContent">{blockInfo.blksize} KB</td>
              </tr>
              <tr>
                <td className="infoTitle">트랜잭션 수</td>
                <td className="infoContent">
                  1{/* {blockInfo.txnum.length} */}
                  {visible ? (
                    <button
                      type="button"
                      className="txInfoBtn"
                      onClick={txInfoHandler}
                    >
                      간략히
                      <GoTriangleUp style={{ marginLeft: "2px" }} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="txInfoBtn"
                      onClick={txInfoHandler}
                    >
                      자세히
                      <GoTriangleDown
                        style={{
                          position: "relative",
                          top: "2px",
                          marginLeft: "2px",
                        }}
                      />
                    </button>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          {visible ? <TxInfo txnum={String(blockInfo.txnum)} /> : ""}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlockInfo;
