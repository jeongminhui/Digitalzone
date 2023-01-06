import React, { useEffect, useState } from "react";
import "./Block.scss";
import Footer from "../Footer/Footer";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import BlockChart from "./BlockChart";
import BlockTable from "./BlockTable";

const Block = () => {
  const blockCollection = collection(db, "block");
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function getBlocks() {
      const data = await getDocs(blockCollection);
      data.docs.map((items) => {
        return makeBlockData(items.data());
      });
    }
    getBlocks();
  }, []);

  // row 구조
  const makeBlockData = (item) => {
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
  };

  // navigation 블록 상세 이동
  const [blocknum, setBlocknum] = useState("");
  const navigate = useNavigate();

  const clickHandler = (blocknum) => {
    navigate(`/block/${blocknum}`);
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
