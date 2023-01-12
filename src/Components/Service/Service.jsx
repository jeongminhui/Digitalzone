import React, { useEffect, useState } from "react";
import "./Service.scss";
import "../Block/Block.scss";
import Footer from "../Footer/Footer";
import ServiceTable from "./ServiceTable";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Refresh from "../Node/Refresh";

// recoil Atom에서 가져오기
import { useRecoilValue } from "recoil";
import { serviceSelector } from "../../Recoil/Selector";
import ServiceChart from "./ServiceChart/ServiceChart";
import { loginSelector } from "../../Recoil/Selector";

import { useRecoilState } from "recoil";
import { currentBlockAtom } from "../../Recoil/Atom";

const Service = () => {
  const serviceData = useRecoilValue(serviceSelector);
  const [rows, setRows] = useState([]);
  const [currentBlock, setCurrentBlock] = useRecoilState(currentBlockAtom);

  // 권한 설정
  const loginUser = useRecoilValue(loginSelector);
  const [user, setUser] = useState({
    serviceUser: false,
    nodeUser: false,
    tranUser: false,
  });
  const [serviceAuth, setServiceAuth] = useState({
    service_a: true,
    service_b: false,
    service_c: true,
    service_d: false,
    service_e: false,
  });

  useEffect(() => {
    setUser({
      nodeUser: loginUser?.useradmin.node,
      tranUser: loginUser?.useradmin.transaction,
      blockUser: loginUser?.useradmin.block,
    });

    setServiceAuth({
      service_a: loginUser?.userservice.service_a,
      service_b: loginUser?.userservice.service_b,
      service_c: loginUser?.userservice.service_c,
      service_d: loginUser?.userservice.service_d,
      service_e: loginUser?.userservice.service_e,
    });
  }, []);

  useEffect(() => {
    // row 구조
    serviceData.map((item) => {
      setRows((prev) => [
        ...prev,
        {
          service: item.service,
          createdt: item.createdt,
          apitype: item.apitype,
          nodename: item.nodename,
          txnum: item.txnum,
          blocknum: item.blocknum,
          status: item.status,
        },
      ]);
    });
  }, []);

  // navigation 서비스 상세 이동
  const [blocknum, setBlocknum] = useState("");
  const navigate = useNavigate();

  // 서비스 상세 이동
  const moveServiceInfo = (service, blocknum) => {
    switch (service) {
      case "A서비스":
        service = "service_a";
        break;
      case "B서비스":
        service = "service_b";
        break;
      case "C서비스":
        service = "service_c";
        break;
      case "D서비스":
        service = "service_d";
        break;
      case "E서비스":
        service = "service_e";
        break;
      default:
        return;
    }

    serviceAuth[service]
      ? navigate(`/service/${blocknum}`)
      : Swal.fire({
          icon: "warning",
          text: "권한이 없습니다. 관리자에게 요청하십시오.",
          showCancelButton: false,
          confirmButtonText: "확인",
        }).then((res) => {
          if (res.isConfirmed) {
            return;
          }
        });
  };

  useEffect(() => {
    navigate(`/service/${blocknum}`);
  }, [blocknum]);

  // 트랜잭션 상세 이동
  const moveTxInfo = (txnum) => {
    user.tranUser
      ? navigate(`/transaction/${txnum}`)
      : Swal.fire({
          icon: "warning",
          text: "권한이 없습니다. 관리자에게 요청하십시오.",
          showCancelButton: false,
          confirmButtonText: "확인",
        }).then((res) => {
          if (res.isConfirmed) {
            return;
          }
        });
  };

  // 노드 상세 이동
  const moveNodeInfo = (nodename) => {
    user.nodeUser
      ? navigate(`/node/${nodename}`)
      : Swal.fire({
          icon: "warning",
          text: "권한이 없습니다. 관리자에게 요청하십시오.",
          showCancelButton: false,
          confirmButtonText: "확인",
        }).then((res) => {
          if (res.isConfirmed) {
            return;
          }
        });
  };

  // 블록 상세 이동
  const moveBlockInfo = (blocknum, idx) => {
    setCurrentBlock(idx);
    navigate(`/block/${blocknum}`);
  };

  return (
    <div className="Service">
      <div className="wrapper">
        <h1 className="mainTitle">서비스</h1>
        <h3 className="subTitle">
          <span className="subBar">|</span> 전체 발급 {rows.length}건
        </h3>
        <ServiceChart rows={rows} />
        <Refresh />
        <ServiceTable
          rows={rows}
          moveServiceInfo={moveServiceInfo}
          moveTxInfo={moveTxInfo}
          moveBlockInfo={moveBlockInfo}
          moveNodeInfo={moveNodeInfo}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Service;
