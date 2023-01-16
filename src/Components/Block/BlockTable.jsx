import React, { useContext, useEffect, useState } from "react";
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
import "../Block/BlockChart/BlockChart.scss";
import { koKR } from "@mui/material/locale";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ThemeContext } from "../Context/ThemeContext";

const BlockTable = ({ rows, clickHandler }) => {
  //다크모드
  const darkmodeTheme = useContext(ThemeContext);
  const darkmode = darkmodeTheme.isDarkMode;

  const columns = [
    { id: "service", label: "서비스명", minWidth: 80 },
    { id: "blocknum", label: "블록번호", minWidth: 80 },
    {
      id: "createdt",
      label: "타임스탬프",
      minWidth: 100,
    },
    {
      id: "blockhash",
      label: "블록해시",
      minWidth: 130,
    },
    {
      id: "blksize",
      label: "블록크기",
      minWidth: 70,
    },
    {
      id: "txcount",
      label: "트랜잭션 수",
      minWidth: 70,
    },
  ];

  // css
  const theme = createTheme(
    {
      typography: {
        allVariants: {
          fontFamily: "Noto Sans KR",
          fontSize: 14,
          color: darkmode ? "var(--bg-color)" : "var(--dark-grey-color)",
        },
      },
      palette: {
        background: {
          paper: "#F0F4FB",
          content: "#ffffff",
        },
      },
    },
    koKR
  );

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

  // pagenation
  const [pagenation, setPagenation] = useState(1);

  const handleChange = (event, value) => {
    setPagenation(value);
  };

  useEffect(() => {
    setPage(pagenation - 1);
  }, [pagenation]);

  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          boxShadow: "none",
        }}
      >
        <TableContainer
          sx={{ bgcolor: darkmode ? "var(--darkmode-color)" : "#fff" }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    sx={{
                      bgcolor: darkmode ? "#434c6c" : "#F0F4FB",
                      color: darkmode ? "#F0F4FB" : "#000000",
                      fontWeight: "bold",
                    }}
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
                      onClick={() => clickHandler(row.blocknum, idx)}
                      className="tableRow"
                    >
                      {/* 이부분 map으로 돌리셔도 됩니다! */}
                      <TableCell
                        key={row.service}
                        style={{
                          color: darkmode ? "var(--bg-color)" : "#000000",
                        }}
                      >
                        {row.service}
                      </TableCell>
                      <TableCell
                        key={row.blocknum}
                        className="blue"
                        style={{
                          color: darkmode
                            ? "var(--bg-color)"
                            : "var(--point-color)",
                        }}
                      >
                        {row.blocknum}
                      </TableCell>
                      <TableCell
                        key={row.createdt}
                        style={{
                          color: darkmode ? "var(--bg-color)" : "#000000",
                        }}
                      >
                        {row.createdt}
                      </TableCell>
                      <TableCell
                        key={row.blockhash}
                        style={{
                          color: darkmode ? "var(--bg-color)" : "#000000",
                        }}
                      >
                        {row.blockhash}
                      </TableCell>
                      <TableCell
                        key={row.blksize}
                        style={{
                          color: darkmode ? "var(--bg-color)" : "#000000",
                        }}
                      >
                        {row.blksize} KB
                      </TableCell>
                      <TableCell
                        key={row.txnum}
                        style={{
                          color: darkmode ? "var(--bg-color)" : "#000000",
                        }}
                      >
                        {row.txnum.length}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          <div className="pagenationDIV">
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
          </div>
        </TableContainer>
      </Paper>
    </ThemeProvider>
  );
};

export default BlockTable;
