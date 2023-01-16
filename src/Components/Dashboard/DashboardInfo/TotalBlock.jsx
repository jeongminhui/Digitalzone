import React from "react";
import { IoCube } from "react-icons/io5";
import { Link } from "react-router-dom";

// recoil로 불러오기
import { useRecoilValue } from "recoil";
import { blockSelector } from "../../../Recoil/Selector";

const TotalBlock = (props) => {
  const blockData = useRecoilValue(blockSelector);

  return (
    <div className="TotalBlock Dashboard_infoBox">
      <Link to="/block">
        <div className="Dashboard_title">전체 블록 수</div>
        <div className="Dashboard_data">{blockData.length}</div>
        <div className="Dashboard_time">{props.DateTime}</div>
      </Link>
      <div className="Dashboard_icon Dashboard_iconBorder">
        <IoCube fill="#fff" size="25" />
      </div>
    </div>
  );
};

export default TotalBlock;
