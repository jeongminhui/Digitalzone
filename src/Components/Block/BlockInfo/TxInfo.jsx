import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { HiOutlineDocumentText } from "react-icons/hi";

import { Button, Modal } from "antd";

const TxInfo = ({ txInfo }) => {
  const columns = [
    { id: "txnum", label: "트랜잭션번호", minWidth: 100 },
    {
      id: "createdt",
      label: "타임스탬프",
      minWidth: 100,
    },
    {
      id: "txhash",
      label: "트랜잭션해시",
      minWidth: 130,
    },
    {
      id: "txsize",
      label: "트랜잭션크기",
      minWidth: 70,
    },
    {
      id: "txdata",
      label: "데이터",
      minWidth: 70,
    },
  ];

  const openModal = () => {
    console.log(txInfo.txdata);
  };

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
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
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
                  <button type="button" onClick={showModal}>
                    <HiOutlineDocumentText />
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
          <Button
            key="submit"
            type="primary"
            // loading={loading}
            onClick={handleOk}
          >
            Submit
          </Button>,
        ]}
      >
        <p>{JSON.stringify(txInfo.txdata, null, 2)}</p>
      </Modal>

      {/* <Modal
        title="트랜잭션 데이터 상세"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{JSON.stringify(txInfo.txdata, null, 2)}</p>
      </Modal> */}
    </div>
  );
};

export default TxInfo;
