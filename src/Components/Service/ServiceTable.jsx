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
import "../Block/BlockChart/BlockChart.scss";
import { koKR } from "@mui/material/locale";
import { createTheme, ThemeProvider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { currentBlockAtom } from "../../Recoil/Atom";
import { useRecoilState } from "recoil";
import Swal from "sweetalert2";
import { useRecoilValue } from "recoil";
import { loginSelector } from "../../Recoil/Selector";
import { collection, getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

const ServiceTable = (props) => {

  const StyledTableCell = withStyles({
    root: {
      color: "#3d3d3d"
    }
  })(TableCell);

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
          color: "#3d3d3d",
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
        <TableContainer sx={{ bgcolor: "#fff" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <StyledTableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    sx={{ bgcolor: "#F0F4FB", fontWeight: "bold" }}
                    className={column.id}
                  >
                    {column.label}
                  </StyledTableCell>
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
                      className="tableRow"
                    >
                      {/* 이부분 map으로 돌리셔도 됩니다! */}
                      <TableCell
                        key={row.service}
                        className="blue"
                        onClick={() =>
                          moveServiceInfo(row.service, row.blocknum)
                        }
                      >
                        {row.service}
                      </TableCell>
                      <TableCell
                        key={row.createdt}
                        onClick={() =>
                          moveServiceInfo(row.service, row.blocknum)
                        }
                      >
                        {row.createdt}
                      </TableCell>
                      <TableCell
                        key={row.apitype}
                        onClick={() =>
                          moveServiceInfo(row.service, row.blocknum)
                        }
                      >
                        {row.apitype}
                      </TableCell>
                      <TableCell
                        key={row.nodename}
                        onClick={() => moveNodeInfo(row.nodename)}
                      >
                        {row.nodename}
                      </TableCell>
                      <TableCell
                        key={row.txnum}
                        onClick={() => moveTxInfo(row.txnum)}
                      >
                        {row.txnum}
                      </TableCell>
                      <TableCell
                        key={row.blocknum}
                        onClick={() => moveBlockInfo(row.blocknum, idx)}
                      >
                        {row.blocknum}
                      </TableCell>
                      <TableCell key={row.status}>{row.status}</TableCell>
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

export default ServiceTable;
