import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";

const ActiveNetworkData = () => {
  const dashboard_nodeCollection = collection(db, "node");
  const [network, setNetwork] = useState({
    allNetwork: "",
    activeNetwork: 0,
  });

  useEffect(() => {
    async function getNode() {
      const nodeData = await getDocs(dashboard_nodeCollection);

      const active = nodeData.docs.filter((items) => {
        return items.data().ndstatus === "활성화";
      });

      console.log(...active);

      setNetwork({
        ...network,
        allNetwork: nodeData.docs.length,
        activeNetwork: active.length,
      });
    }
    getNode();
  }, []);

  return (
    <div className="ActiveNetworkData">
      <div>
        활성 네트워크 수 : {network.activeNetwork} / 전체 네트워크 수 :{" "}
        {network.allNetwork}
      </div>
    </div>
  );
};

export default ActiveNetworkData;
