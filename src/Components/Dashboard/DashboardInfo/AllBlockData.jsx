import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";

const AllBlockData = () => {
  // Firebase에서 block컬렉션 정보를 가져옴
  const dashboard_blockCollection = collection(db, "block");
  const [blockDataSize, setBlockDataSize] = useState("");

  useEffect(() => {
    async function getBlock() {
      // getDocs로 정보를 가져옴
      const blockData = await getDocs(dashboard_blockCollection);
      return setBlockDataSize(blockData.docs.length);
    }
    getBlock();
  }, [dashboard_blockCollection]);

  return (
    <div className="AllBlockData">
      <div>전체 블록 수 : {blockDataSize}</div>
    </div>
  );
};

export default AllBlockData;
