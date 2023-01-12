import React, { useEffect, useState } from "react";
import "./BlockInfo.scss";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { HiOutlineDocumentText } from "react-icons/hi";
import { async } from "@firebase/util";
import { collection, getDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";
import Swal from "sweetalert2";

import { Button, Modal } from "antd";
import { width } from "@mui/system";

import { useRecoilValue } from "recoil";
import { loginSelector } from "../../../Recoil/Selector";
import { useNavigate } from "react-router-dom";
import Modal1 from "../../CommonComponents/Modal/Modal1";

const TxInfo = ({ txnum }) => {
  const txCollection = collection(db, "transaction_test");
  const [txInfo, setTxInfo] = useState({});

  // 권한 설정
  const loginUser = useRecoilValue(loginSelector);
  const [tranUser, setTranUser] = useState(true);
  const [tranNum, setTranNum] = useState("");
  console.log(loginUser);

  // useEffect(() => {
  //   setTranUser(loginUser?.useradmin.transaction);
  // }, []);

  useEffect(() => {
    async function getBlockInfo() {
      // 트랜잭션 상세 정보 로드
      const txRef = doc(txCollection, String(txnum));
      const txdata = await getDoc(txRef);
      setTxInfo(txdata.data());
    }
    getBlockInfo();
  }, [txnum]);

  const columns = [
    {
      id: "txnum",
      label: "트랜잭션번호",
      minWidth: 100,
      backgroundColor: "#F0F4FB",
    },
    {
      id: "createdt",
      label: "타임스탬프",
      minWidth: 100,
      backgroundColor: "#F0F4FB",
    },
    {
      id: "txhash",
      label: "트랜잭션해시",
      minWidth: 130,
      backgroundColor: "#F0F4FB",
    },
    {
      id: "txsize",
      label: "트랜잭션크기",
      minWidth: 70,
      backgroundColor: "#F0F4FB",
    },
    {
      id: "txdata",
      label: "데이터",
      minWidth: 70,
      backgroundColor: "#F0F4FB",
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    tranUser
      ? setIsModalOpen(true)
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
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();

  const clickHandler = (txnum) => {
    tranUser
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

  return (
    <div>
      <Paper sx={{ width: "100%", overflow: "hidden", boxShadow: "none" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      backgroundColor: column.backgroundColor,
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow hover role="checkbox" tabIndex={-1} key={txInfo.code}>
                <TableCell onClick={() => clickHandler(txInfo.txnum)}>
                  {txInfo.txnum}
                </TableCell>
                <TableCell onClick={() => clickHandler(txInfo.txnum)}>
                  {txInfo.createdt}
                </TableCell>
                <TableCell onClick={() => clickHandler(txInfo.txnum)}>
                  {txInfo.txhash}
                </TableCell>
                <TableCell onClick={() => clickHandler(txInfo.txnum)}>
                  {txInfo.txsize} KB
                </TableCell>
                <TableCell>
                  <button
                    type="button"
                    onClick={showModal}
                    className="modalBtn"
                  >
                    <HiOutlineDocumentText
                      className="modalIcon"
                      style={{ stroke: "#3d3d3d" }}
                    />
                  </button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Modal
        open={isModalOpen}
        title="트랜잭션 데이터 상세"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          [
            // <Button
            //   key="submit"
            //   type="primary"
            //   onClick={handleOk}
            //   className="submitBtn"
            // >
            //   <span>확인</span>
            // </Button>,
          ]
        }
      >
        <p className="txdataBox">{JSON.stringify(txInfo.txdata, null, 2)}</p>
      </Modal>
    </div>
  );
};

export default TxInfo;