import React, { useEffect, useState } from "react";
import ChartLeft from "./ChartLeft";
import ChartRight from "./ChartRight";
import TranTable from "./TranTable";
import { useNavigate } from "react-router-dom";
import "../../Transaction/Transaction.scss";
import { useRecoilValue } from 'recoil';
import { loginSelector } from '../../../Recoil/Selector';
import Refresh from "../../Node/Refresh";
import Swal from 'sweetalert2';


const TranMain = ({ rows }) => {
  const loginUser = useRecoilValue(loginSelector);
  const [TranUser, setTranUser] = useState(false);
  
    useEffect(() => {
    setTranUser(loginUser?.useradmin.transaction);
  },[])

  
  let columns = [];
    TranUser ?
     columns = [
      { id: "service", label: "서비스명", minWidth: 70 },
      { id: "ndstatus", label: "상태", minWidth: 70 },
      { id: "nodename", label: "노드명", minWidth: 70, color:'#4669f5'},
      { id: "ndtype", label: "유형", minWidth: 70 },
      { id: "service_dcc", label: "서비스명", minWidth: 70 },
      { id: "ipaddress", label: "IP", minWidth: 170 },
      { id: "blocknum", label: "최신블록번호", minWidth: 100 },
      { id: "createdt", label: "최신블록시간", minWidth: 170 },
      { id: "tps", label: "처리속도(TPS)", minWidth: 50 },
      { id: "latency", label: "지연율(Latency)",minWidth: 70},     
    ]
    :
    columns = [
      { id: "service", label: "서비스명", minWidth: 70 },
      { id: "ndstatus", label: "상태", minWidth: 70 },
      { id: "nodename", label: "노드명", minWidth: 70, color:'#4669f5'},
      { id: "ndtype", label: "유형", minWidth: 70 },
      { id: "service_dcc", label: "서비스명", minWidth: 70 },
      { id: "ipaddress", label: "IP", minWidth: 170 },
      { id: "blocknum", label: "최신블록번호", minWidth: 100 },
      { id: "createdt", label: "최신블록시간", minWidth: 170 },
    ];

  // navigation 상세 이동
  const [txnum, setTxnum] = useState("");
  const navigate = useNavigate();
  const clickHandler = (txnum) => {
    TranUser ? setTxnum(txnum)
    :
    Swal.fire({
      icon: "warning",
      text: "권한이 없습니다. 관리자에게 요청하십시오.",
      showCancelButton: false,
      confirmButtonText: "확인",
  }).then((res) => {
      if (res.isConfirmed) {
          return;
      }     
  })
}

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
