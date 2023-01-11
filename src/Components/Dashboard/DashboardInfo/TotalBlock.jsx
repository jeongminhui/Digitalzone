import React, { useEffect } from "react";
import "./TotalBlock.scss";
import { IoCube } from "react-icons/io5";

// recoil로 불러오기
import { useRecoilValue } from "recoil";
import { blockSelector } from "../../../Recoil/Selector";
import { Link } from "react-router-dom";

const TotalBlock = (props) => {
  const blockData = useRecoilValue(blockSelector);

  return (
    <div className="TotalBlock">
      <Link to="/block">
        <div className="Dashboard_title">전체 블록 수</div>
        <div className="Dashboard_data">{blockData.length}</div>
        <div className="Dashboard_time">{props.DateTime}</div>
      </Link>
      <div className="Dashboard_icon">
        <IoCube fill="#fff" size="25" />
      </div>
    </div>
  );
};

export default TotalBlock;
