import React, { useEffect, useState } from "react";
import "./Block.scss";
import Footer from "../Footer/Footer";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import BlockChart from "./BlockChart/BlockChart";
import BlockTable from "./BlockTable";

// recoil Atom에서 가져오기
import { useRecoilValue } from "recoil";
import { blockSelector } from "../../Recoil/Selector";
import { useRecoilState } from "recoil";
import { currentBlockAtom } from "../../Recoil/Atom";

const Block = () => {
  const blockData = useRecoilValue(blockSelector);
  const [currentBlock, setCurrentBlock] = useRecoilState(currentBlockAtom);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    // row 구조
    blockData.map((item) => {
      setRows((prev) => [
        ...prev,
        {
          service: item.service,
          blocknum: item.blocknum,
          createdt: item.createdt,
          blockhash: item.blockhash,
          blksize: item.blksize,
          txnum: item.txnum,
        },
      ]);
    });
  }, []);

  // navigation 블록 상세 이동
  const [blocknum, setBlocknum] = useState("");
  const navigate = useNavigate();

  const clickHandler = (blocknum, idx) => {
    navigate(`/block/${blocknum}`);
    setCurrentBlock(idx);
  };

  useEffect(() => {
    navigate(`/block/${blocknum}`);
  }, [blocknum]);

  return (
    <div className="Block">
      <div className="wrapper">
        <h1 className="mainTitle">블록</h1>
        <h3 className="subTitle">
          <span className="subBar">|</span> 전체 블록 {rows.length}개
        </h3>

        <BlockChart rows={rows} />
        <BlockTable rows={rows} clickHandler={clickHandler} />
      </div>

      <Footer />
    </div>
  );
};

export default Block;
