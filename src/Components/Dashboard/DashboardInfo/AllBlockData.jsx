import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";

const AllBlockData = () => {
  const dashboard_blockCollection = collection(db, "block");
  const [blockDataSize, setBlockDataSize] = useState("");

  useEffect(() => {
    async function getBlock() {
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
