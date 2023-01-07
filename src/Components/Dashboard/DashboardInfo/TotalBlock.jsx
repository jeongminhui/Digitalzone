import React from "react";
import "./TotalBlock.scss";
import { GiCube } from "react-icons/gi";

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
        <div className="Dashboard_data">값</div>
        <div className="Dashboard_time">{props.DateTime}</div>
      </Link>
      <div className="Dashboard_icon">
        <GiCube size="30" fill="#fff" />
      </div>
    </div>
  );
};

export default TotalBlock;
