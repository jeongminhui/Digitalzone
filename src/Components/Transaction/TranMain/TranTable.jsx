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
import { koKR } from "@mui/material/locale";
import { createTheme, ThemeProvider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { currentBlockAtom } from "../../../Recoil/Atom";
import { useRecoilState } from "recoil";
import { ThemeContext } from "../../Context/ThemeContext";

const TranTable = ({ rows, clickHandler }) => {
  const navigate = useNavigate();
  const [blockNum, setBlockNum] = useState("");
  // recoil Atom에서 가져오기
  const [currentBlock, setCurrentBlock] = useRecoilState(currentBlockAtom);

  // 다크모드
  const darkmodeTheme = useContext(ThemeContext);
  const darkmode = darkmodeTheme.isDarkMode;

  const columns = [
    { id: "service", label: "서비스명", minWidth: 80, align: "center" },
    { id: "txnum", label: "트랜잭션번호", minWidth: 80, align: "center" },
    {
      id: "createdt",
      label: "타임스탬프",
      minWidth: 100,
      align: "center",
    },
    {
      id: "txhash",
      label: "트랜잭션해시",
      minWidth: 130,
      align: "center",
    },
    {
      id: "txsize",
      label: "트랜잭션크기",
      minWidth: 70,
      align: "center",
    },
    {
      id: "blocknum",
      label: "블록번호",
      minWidth: 70,
      align: "center",
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
        text: {
          primary: darkmode ? "#fff" : "#000",
        },
        primary: {
          main: darkmode ? "#434c6c" : "#ebedf3",
          contrastText: darkmode ? "#fff" : "#000",
        },
        background: {
          paper: darkmode ? "#434c6c" : "#fff",
          content: darkmode ? "#ffffff" : "#ebedf3",
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

  //pagenation
  const [pagenation, setPagenation] = useState(1);

  const handleChange = (event, value) => {
    setPagenation(value);
  };

  useEffect(() => {
    setPage(pagenation - 1);
  }, [pagenation]);

  //블록번호 클릭시 블록페이지로 이동
  const clickBlockHandler = (blockNum, idx) => {
    setBlockNum(blockNum);
    setCurrentBlock(idx);
    navigate(`/block/${blockNum}`);
  };
  return (
    <div className="tableWrapper">
      <ThemeProvider theme={theme}>
        <Paper sx={{ width: "100%", overflow: "hidden", boxShadow: "none" }}>
          <TableContainer
            sx={{ bgcolor: darkmode ? "var(--darkmode-color)" : "#fff" }}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.label}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                      sx={{
                        bgcolor: darkmode
                          ? "var(--dark-table-color)"
                          : "#F0F4FB",
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
                        key={idx}
                        className="tableRow"
                        style={{ cursor: "pointer" }}
                      >
                        {/* 이부분 map으로 돌리셔도 됩니다! */}
                        <TableCell
                          key={row.service}
                          onClick={() => clickHandler(row.txnum, idx)}
                          style={{
                            color: darkmode ? "var(--bg-color)" : "#000000",
                          }}
                          align="center"
                        >
                          {row.service}
                        </TableCell>
                        <TableCell
                          key={row.txnum}
                          onClick={() => clickHandler(row.txnum, idx)}
                          className="blue"
                          style={{
                            color: darkmode
                              ? "var(--bg-color)"
                              : "var(--point-color)",
                          }}
                          align="center"
                        >
                          {row.txnum}
                        </TableCell>
                        <TableCell
                          key={row.createdt}
                          onClick={() => clickHandler(row.txnum, idx)}
                          style={{
                            color: darkmode ? "var(--bg-color)" : "#000000",
                          }}
                          align="center"
                        >
                          {row.createdt}
                        </TableCell>
                        <TableCell
                          key={row.txhash}
                          onClick={() => clickHandler(row.txnum, idx)}
                          style={{
                            color: darkmode ? "var(--bg-color)" : "#000000",
                          }}
                          align="center"
                        >
                          {row.txhash}
                        </TableCell>
                        <TableCell
                          key={row.txsize}
                          onClick={() => clickHandler(row.txnum, idx)}
                          style={{
                            color: darkmode ? "var(--bg-color)" : "#000000",
                          }}
                          align="center"
                        >
                          {row.txsize} KB
                        </TableCell>
                        <TableCell
                          key={row.blocknum}
                          onClick={() => clickBlockHandler(row.blocknum, idx)}
                          style={{
                            color: darkmode ? "var(--bg-color)" : "#000000",
                          }}
                          align="center"
                        >
                          {row.blocknum}{" "}
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
                    color="primary"
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
    </div>
  );
};

export default TranTable;
