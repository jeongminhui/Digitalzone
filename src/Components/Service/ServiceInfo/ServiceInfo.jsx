import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../../Footer/Footer";
import { collection, getDoc, doc } from "firebase/firestore";
import { async } from "@firebase/util";
import { db } from "../../../firebase";
import copy from "copy-to-clipboard";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import "../../Transaction/TranInfo/TranInfo.scss";
import { useNavigate } from "react-router-dom";
import { currentBlockAtom } from "../../../Recoil/Atom";
import { useRecoilState } from "recoil";
import Swal from "sweetalert2";
import { loginSelector } from "../../../Recoil/Selector";
import { useRecoilValue } from "recoil";

const ServiceInfo = () => {
  const { blocknum } = useParams();
  const serviceCollection = collection(db, "service");
  const [serviceInfo, setServiceInfo] = useState({});
  const [copyBtn, setCopyBtn] = useState("COPY");
  const navigate = useNavigate();
  const [blockNum, setBlockNum] = useState("");
  // recoil Atom에서 가져오기
  const [currentBlock, setCurrentBlock] = useRecoilState(currentBlockAtom);
  //권한
  const loginUser = useRecoilValue(loginSelector);
  const [TranUser, setTranUser] = useState(false);
  const [NodeUser, setNodeUser] = useState(false);

  useEffect(() => {
    setTranUser(loginUser?.useradmin.transaction);
    setNodeUser(loginUser?.useradmin.node);
  }, []);
  useEffect(() => {
    async function getServiceInfo() {
      // 서비스 상세 정보 로드
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

  //블록번호 클릭시 블록페이지로 이동
  const clickBlockHandler = () => {
    // setBlockNum(serviceInfo.blocknum);
    setCurrentBlock(serviceInfo.id - 1);
    navigate(`/block/${serviceInfo.blocknum}`);
  };

  // 트랜잭션 권한별 이동
  const moveTxInfo = (txnum) => {
    TranUser
      ? navigate(`/transaction/${serviceInfo.txnum}`)
      : Swal.fire({
          icon: "warning",
          text: "권한이 없습니다. 관리자에게 요청하십시오.",
          showCancelButton: false,
          confirmButtonText: "확인",
        }).then((res) => {
          if (res.isConfirmed) {
            return;
          }
        });
  };

  // 노드 상세 이동
  const moveNodeInfo = () => {
    NodeUser
      ? navigate(`/node/${serviceInfo.nodename}`)
      : Swal.fire({
          icon: "warning",
          text: "권한이 없습니다. 관리자에게 요청하십시오.",
          showCancelButton: false,
          confirmButtonText: "확인",
        }).then((res) => {
          if (res.isConfirmed) {
            return;
          }
        });
  };

  return (
    <div className="serviceInfo">
      <div className="wrap">
        <h1 className="mainTitle">서비스</h1>
        <div className="subTitle">
          <h3 className="detailInfoTitle">
            {" "}
            <span className="subBar">|</span> 상세정보
          </h3>
          <Link to="/service">
            <button className="listBtn">목록으로</button>
          </Link>
        </div>
        <div className="tableWrap detailInfoBox">
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
                <td
                  className="infoContent"
                  onClick={() => {
                    moveNodeInfo();
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {serviceInfo.nodename}
                </td>
              </tr>
              <tr>
                <td className="infoTitle">트랜잭션 번호</td>
                <td
                  className="infoContent"
                  onClick={() => {
                    moveTxInfo();
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {serviceInfo.txnum}
                </td>
              </tr>
              <tr>
                <td className="infoTitle">트랜잭션 해시</td>
                <td
                  className="infoContent"
                  onClick={() => {
                    moveTxInfo();
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {serviceInfo.txhash}
                </td>
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
                <td className="infoTitle">블록 번호</td>
                <td
                  className="infoContent"
                  onClick={() => clickBlockHandler()}
                  style={{ cursor: "pointer" }}
                >
                  {serviceInfo.blocknum}
                </td>
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
