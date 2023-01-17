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
import { createTheme, ThemeProvider, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { currentBlockAtom } from "../../Recoil/Atom";
import { useRecoilState } from "recoil";
import Swal from "sweetalert2";
import { useRecoilValue } from "recoil";
import { loginSelector } from "../../Recoil/Selector";
import { collection, getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { ThemeContext } from "../Context/ThemeContext";

const ServiceTable = (props) => {
  //다크모드
  const darkmodeTheme = useContext(ThemeContext);
  const darkmode = darkmodeTheme.isDarkMode;

  const { rows, moveServiceInfo, moveTxInfo, moveBlockInfo, moveNodeInfo } =
    props;

  const columns = [
    { id: "service", label: "서비스명", minWidth: 80 },
    {
      id: "createdt",
      label: "타임스탬프",
      minWidth: 100,
    },
    {
      id: "apitype",
      label: "API 종류",
      minWidth: 130,
    },
    {
      id: "nodename",
      label: "노드명",
      minWidth: 130,
    },
    {
      id: "txnum",
      label: "트랜잭션 번호",
      minWidth: 70,
    },
    { id: "blocknum", label: "블록번호", minWidth: 80 },
    {
      id: "status",
      label: "상태",
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
    // 11;
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
      <Paper sx={{ width: "100%", overflow: "hidden", boxShadow: "none" }}>
        <TableContainer
          sx={{ bgcolor: darkmode ? "var(--darkmode-color)" : "#fff" }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={"center"}
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
                      key={idx}
                      className="tableRow"
                    >
                      <Tooltip
                        title="해당 노드의 상세페이지로 이동합니다."
                        arrow
                      >
                        <TableCell
                          key={row.service}
                          className="blue"
                          onClick={() =>
                            moveServiceInfo(row.service, row.blocknum)
                          }
                          style={{
                            color: darkmode
                              ? "var(--bg-color)"
                              : "var(--point-color)",
                          }}
                        >
                          {row.service}
                        </TableCell>
                      </Tooltip>

                      <TableCell
                        key={row.createdt}
                        onClick={() =>
                          moveServiceInfo(row.service, row.blocknum)
                        }
                        style={{
                          color: darkmode ? "var(--bg-color)" : "#000000",
                        }}
                      >
                        {row.createdt}
                      </TableCell>
                      <TableCell
                        key={row.apitype}
                        onClick={() =>
                          moveServiceInfo(row.service, row.blocknum)
                        }
                        style={{
                          color: darkmode ? "var(--bg-color)" : "#000000",
                        }}
                      >
                        {row.apitype}
                      </TableCell>

                      <TableCell
                        key={row.nodename}
                        onClick={() => moveNodeInfo(row.nodename)}
                        align="center"
                      >
                        {row.nodename}
                      </TableCell>

                      <TableCell
                        key={row.status}
                        style={{
                          color: darkmode ? "var(--bg-color)" : "#000000",
                        }}
                      >
                        {row.status}
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
  );
};

export default ServiceTable;
