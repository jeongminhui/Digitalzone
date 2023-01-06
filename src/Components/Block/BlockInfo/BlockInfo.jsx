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
import Slider from "react-slick";
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

  // ㅋㅐ러셀
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
  };

  const [block, setBlock] = useState([]);

  useEffect(() => {
    async function getBlocks() {
      const data = await getDocs(blockCollection);
      const arr = data.docs.map((items) => {
        return items.data();
      });
      setBlock(arr);
    }
    getBlocks();
  }, []);

  // const location = useLocation();
  const [blocknumber, setBlocknumber] = useState(blocknum);
  const navigate = useNavigate();

  const clickHandler = (num) => {
    setBlocknumber(num);
    navigate(`/block/${blocknumber}`);
  };

  useEffect(() => {
    navigate(`/block/${blocknumber}`);
  }, [blocknumber]);

  return (
    <div className="BlockInfo">
      <h1>블록 상세정보 페이지 입니다</h1>

      {/* 롤링 메뉴 */}
      <Slider {...settings}>
        {block.map((item, idx) => (
          <div
            key={idx}
            onClick={() => {
              clickHandler(item.blocknum);
            }}
          >
            <h3>{item.blocknum}</h3>
          </div>
        ))}
      </Slider>
      {/*  */}

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
            <td>타임스탬프</td>
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
