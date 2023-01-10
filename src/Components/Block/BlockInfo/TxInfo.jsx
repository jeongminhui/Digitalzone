import React, { useEffect, useState } from "react";
import "./BlockInfo.scss"
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

import { Button, Modal } from "antd";
import { width } from "@mui/system";

const TxInfo = ({ txnum }) => {
  const txCollection = collection(db, "transaction");
  const [txInfo, setTxInfo] = useState({});

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
    { id: "txnum", label: "트랜잭션번호", minWidth: 100, backgroundColor: "#F0F4FB" },
    {
      id: "createdt",
      label: "타임스탬프",
      minWidth: 100,
      backgroundColor: "#F0F4FB"
    },
    {
      id: "txhash",
      label: "트랜잭션해시",
      minWidth: 130,
      backgroundColor: "#F0F4FB"
    },
    {
      id: "txsize",
      label: "트랜잭션크기",
      minWidth: 70,
      backgroundColor: "#F0F4FB"
    },
    {
      id: "txdata",
      label: "데이터",
      minWidth: 70,
      backgroundColor: "#F0F4FB"
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
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
                    style={{ minWidth: column.minWidth , backgroundColor: column.backgroundColor}}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow hover role="checkbox" tabIndex={-1} key={txInfo.code}>
                <TableCell>{txInfo.txnum}</TableCell>
                <TableCell>{txInfo.createdt}</TableCell>
                <TableCell>{txInfo.txhash}</TableCell>
                <TableCell>{txInfo.txsize}</TableCell>
                <TableCell>
                  <button type="button" onClick={showModal} className="modalBtn">
                    <HiOutlineDocumentText  className= "modalIcon" style={{ stroke: "#3d3d3d" }}/>
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
        footer={[
          <Button key="submit" type="primary" onClick={handleOk} className= "submitBtn" color="#fff">
            Submit
          </Button>,
        ]}
      >
        <p>{JSON.stringify(txInfo.txdata, null, 2)}</p>
      </Modal>
    </div>
  );
};

export default TxInfo;
