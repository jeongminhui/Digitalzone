import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../../Footer/Footer";
import { collection, getDoc, doc } from "firebase/firestore";
import { async } from "@firebase/util";
import { db } from "../../../firebase";
import copy from "copy-to-clipboard";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import "../../Transaction/TranInfo/TranInfo.scss";

const ServiceInfo = () => {
  const { blocknum } = useParams();
  const serviceCollection = collection(db, "service");
  const [serviceInfo, setServiceInfo] = useState({});
  const [copyBtn, setCopyBtn] = useState("COPY");

  useEffect(() => {
    async function getServiceInfo() {
      // 블록 상세 정보 로드
      const docRef = doc(serviceCollection, blocknum);
      const data = await getDoc(docRef);
      setServiceInfo(data.data());
    }
    getServiceInfo();
  }, [blocknum]);

  // 카피 기능
  function copyButton() {
    copy(serviceInfo.txhash, {
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
    <div className="serviceInfo">
      <div className="wrap">
        <h1 className="mainTitle">서비스</h1>
        <div className="subTitle">
          <h3>
            {" "}
            <span className="subBar">|</span> 상세정보
          </h3>
          <Link to="/service">
            <button className="listBtn">목록으로</button>
          </Link>
        </div>
        <div className="tableWrap">
          <table>
            <tbody>
              <tr>
                <td className="infoTitle">네트워크명</td>
                <td className="infoContent">{serviceInfo.service}</td>
              </tr>
              <tr>
                <td className="infoTitle">타임스탬프</td>
                <td className="infoContent">{serviceInfo.createdt}</td>
              </tr>
              <tr>
                <td className="infoTitle">인증서 종류</td>
                <td className="infoContent">{serviceInfo.apitype}</td>
              </tr>
              <tr>
                <td className="infoTitle">노드명</td>
                <td className="infoContent">{serviceInfo.nodename}</td>
              </tr>
              <tr>
                <td className="infoTitle">트랜잭션 번호</td>
                <td className="infoContent">{serviceInfo.txnum}</td>
              </tr>
              <tr>
                <td className="infoTitle">트랜잭션 해시</td>
                <td className="infoContent">{serviceInfo.txhash}</td>
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
                      <HiOutlineDocumentDuplicate className="icon"style={{ stroke: "#fff" }} />
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
                <td className="infoTitle">블록 번호</td>
                <td className="infoContent">{serviceInfo.blocknum}</td>
              </tr>
              <tr>
                <td className="infoTitle">상태</td>
                <td className="infoContent">{serviceInfo.status}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ServiceInfo;
