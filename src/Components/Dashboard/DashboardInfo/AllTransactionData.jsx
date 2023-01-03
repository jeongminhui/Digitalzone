import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";

const AllTransactionData = () => {
  const dashboard_transactionCollection = collection(db, "transaction");
  const [transactionDataSize, setTransactionDataSize] = useState("");

  useEffect(() => {
    async function getTransaction() {
      const transactionData = await getDocs(dashboard_transactionCollection);
      return setTransactionDataSize(transactionData.docs.length);
    }
    getTransaction();
  }, [dashboard_transactionCollection]);

  return (
    <div className="AllTransactionData">
      <div>전체 트랜잭션 수 : {transactionDataSize}</div>
    </div>
  );
};

export default AllTransactionData;
