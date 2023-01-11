import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { koKR } from "@mui/material/locale";

const TranTable = ({ rows, clickHandler }) => {
  const columns = [
    { id: "service", label: "서비스명", minWidth: 80 },
    { id: "txnum", label: "트랜잭션번호", minWidth: 80 },
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
      id: "blocknum",
      label: "블록번호",
      minWidth: 70,
    },
  ];

  // table
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    setPagenation(page + 1);
  }, [page]);

  //pagenation
    const [pagenation, setPagenation] = useState(1);

    const handleChange = (event, value) => {
      setPagenation(value);
    };

    useEffect(() => {
      setPage(pagenation - 1);
    }, [pagenation]);

  return (
    <div className="tableWrapper">
      <Paper sx={{ width: "99%", overflow: "hidden", boxShadow: "none" }}>
        <TableContainer sx={{ bgcolor: "#fff"}}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    sx={{ bgcolor: "#F0F4FB", fontWeight: "bold" }}
                    className={column.id}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, idx) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                      onClick={() => clickHandler(row.txnum, idx)}
                      className="tableRow"
                    >
                      {/* 이부분 map으로 돌리셔도 됩니다! */}
                      <TableCell key={row.service}>{row.service}</TableCell>
                      <TableCell key={row.txnum}>{row.txnum}</TableCell>
                      <TableCell key={row.createdt}>{row.createdt}</TableCell>
                      <TableCell key={row.txhash}>{row.txhash}</TableCell>
                      <TableCell key={row.txsize}>{row.txsize} KB</TableCell>
                      <TableCell key={row.blocknum}>{row.blocknum}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          <div className="pagenationDIV">
          <div className="pagenation">
            <Stack spacing={2}>
              <Pagination
                count={
                  rows.length % rowsPerPage === 0
                    ? parseInt(rows.length / rowsPerPage)
                    : parseInt(rows.length / rowsPerPage) + 1
                }
                page={pagenation}
                onChange={handleChange}
                showFirstButton
                showLastButton
              />
            </Stack>
          </div>

          <div className="tablePagenation">
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </div>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default TranTable;
