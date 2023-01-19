import React, { useEffect, useState } from "react";
import ChartLeft from "./ChartLeft";
import ChartRight from "./ChartRight";
import TranTable from "./TranTable";
import { useNavigate } from "react-router-dom";
import "../../Transaction/Transaction.scss";
import { useRecoilValue } from "recoil";
import { loginSelector } from "../../../Recoil/Selector";
import Refresh from "../../Node/Refresh";
import Swal from "sweetalert2";
import { useContext } from "react";
import { ThemeContext } from "../../Context/ThemeContext";

const TranMain = ({ rows }) => {
  const loginUser = useRecoilValue(loginSelector);
  const [TranUser, setTranUser] = useState(false);

  // 다크모드
  const theme = useContext(ThemeContext);
  const darkmode = theme.isDarkMode;

  useEffect(() => {
    setTranUser(loginUser?.useradmin.transaction);
  }, []);

  // navigation 상세 이동
  const [txnum, setTxnum] = useState("");
  const navigate = useNavigate();
  const clickHandler = (txnum) => {
    TranUser
      ? setTxnum(txnum)
      : Swal.fire({
          icon: "warning",
          text: "권한이 없습니다. 관리자에게 요청하십시오.",
          showCancelButton: false,
          confirmButtonText: "확인",
          confirmButtonColor: "#4665f9",
          color: darkmode ? "var(--bg-color)" : "#545454",
          background: darkmode ? "var(--darkmode-color)" : "#fff",
        }).then((res) => {
          if (res.isConfirmed) {
            return;
          }
        });
  };

  useEffect(() => {
    navigate(`/transaction/${txnum}`);
  }, [txnum]);

  return (
    <div className="TranMain">
      <h1 className="mainTitle">트랜잭션</h1>
      <h3 className="subTitle">
        <span className="subBar">|</span> 전체 트랜잭션 {rows.length}개
      </h3>
      <div className="chartWrapper">
        <ChartLeft />
        <ChartRight />
      </div>
      <Refresh />
      <TranTable rows={rows} clickHandler={clickHandler} />
    </div>
  );
};

export default TranMain;
