import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaNetworkWired } from "react-icons/fa";

// recoil로 불러오기
import { useRecoilValue } from "recoil";
import { networkSelector } from "../../../Recoil/Selector";

const ActiveNetwork = (props) => {
  const networkData = useRecoilValue(networkSelector);
  const [active, setActive] = useState("");

  useEffect(() => {
    async function getActive() {
      const data = await networkData;
      const dataFiltering = data.filter((item) => {
        return item.ntwstatus === true;
      });
      setActive(dataFiltering);
    }
    getActive();
  }, [networkData]);

  return (
    <div className="ActiveNetwork">
      <Link to="/node">
        <div className="Dashboard_title">활성 네트워크 수</div>
        <div className="Dashboard_data">
          {active.length}
          <span>/{networkData.length}</span>
        </div>
        <div className="Dashboard_time">{props.DateTime}</div>
      </Link>
      <div className="Dashboard_icon">
        <FaNetworkWired fill="#fff" size="25" />
      </div>
    </div>
  );
};

export default ActiveNetwork;
