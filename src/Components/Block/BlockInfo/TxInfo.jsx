import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { HiOutlineDocumentText } from "react-icons/hi";

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
                  <button type="button">
                    <HiOutlineDocumentText />
                  </button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default TxInfo;
