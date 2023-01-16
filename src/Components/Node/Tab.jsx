import { useEffect, useState, useContext } from "react";
import "./Node.scss";
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
import { createTheme, ThemeProvider } from "@mui/material";
import { koKR } from "@mui/material/locale";
import { useNavigate } from "react-router-dom";
import "./Tab.scss";
import Chart from "./Chart";
import { useRecoilState } from "recoil";
import { currentBlockAtom } from "../../Recoil/Atom";
import Swal from "sweetalert2";
import { useRecoilValue } from "recoil";
import { loginSelector } from "../../Recoil/Selector";
import Refresh from "./Refresh";
import { ThemeContext } from "../Context/ThemeContext";

export default function Tab({ rows }) {
  // 권한 설정
  const loginUser = useRecoilValue(loginSelector);
  const [NodeUser, setNodeUser] = useState(false);

  //다크모드
  const darkmodeTheme = useContext(ThemeContext);
  const darkmode = darkmodeTheme.isDarkMode;

  useEffect(() => {
    setNodeUser(loginUser?.useradmin.node);
  }, []);

  let columns = [];
  NodeUser
    ? (columns = [
        { id: "service", label: "서비스명", minWidth: 70 },
        { id: "ndstatus", label: "상태", minWidth: 70 },
        { id: "nodename", label: "노드명", minWidth: 70, color: "#4669f5" },
        { id: "ndtype", label: "유형", minWidth: 70 },
        { id: "service_dcc", label: "서비스명", minWidth: 70 },
        { id: "ipaddress", label: "IP", minWidth: 170 },
        { id: "blocknum", label: "최신블록번호", minWidth: 100 },
        { id: "createdt", label: "최신블록시간", minWidth: 170 },
        { id: "tps", label: "처리속도(TPS)", minWidth: 50 },
        { id: "latency", label: "지연율(Latency)", minWidth: 70 },
      ])
    : (columns = [
        { id: "service", label: "서비스명", minWidth: 70 },
        { id: "ndstatus", label: "상태", minWidth: 70 },
        { id: "nodename", label: "노드명", minWidth: 70, color: "#4669f5" },
        { id: "ndtype", label: "유형", minWidth: 70 },
        { id: "service_dcc", label: "서비스명", minWidth: 70 },
        { id: "ipaddress", label: "IP", minWidth: 170 },
        { id: "blocknum", label: "최신블록번호", minWidth: 100 },
        { id: "createdt", label: "최신블록시간", minWidth: 170 },
      ]);

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

  // recoil Atom에서 가져오기
  const [currentBlock, setCurrentBlock] = useRecoilState(currentBlockAtom);

  // navigation
  const navigate = useNavigate();
  const [nodeName, setNodeName] = useState("");
  const [blockNum, setBlockNum] = useState("");

  const clickHandler = (nodeName) => {
    NodeUser
      ? setNodeName(nodeName)
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

  const clickBlockHandler = (blockNum, idx) => {
    setBlockNum(blockNum);
    setCurrentBlock(idx);
    navigate(`/block/${blockNum}`);
  };

  useEffect(() => {
    navigate(`/node/${nodeName}`);
  }, [nodeName]);

  // Tab
  const [activeIndex, setActiveIndex] = useState(0);

  const tabContArr = [
    {
      tabTitle: (
        <div
          className={activeIndex === 0 ? "is-active left" : "tab"}
          onClick={() => tabClickHandler(0)}
        >
          {" "}
          노드 목록{" "}
        </div>
      ),
      tabCont: (
        <div>
          <Refresh />
          <ThemeProvider theme={theme}>
            <Paper
              sx={{ width: "100%", overflow: "hidden", boxShadow: "none" }}
            >
              <TableContainer
                sx={{
                  maxHeight: 440,
                  bgcolor: darkmode ? "var(--darkmode-color)" : "#fff",
                }}
              >
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            minWidth: column.minWidth,
                            color: column.color,
                          }}
                          sx={{
                            bgcolor: darkmode ? "#434c6c" : "#F0F4FB",
                            color: darkmode ? "#F0F4FB" : "#000000",
                            fontWeight: "bold",
                          }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, idx) => {
                        return NodeUser ? (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.code}
                          >
                            <TableCell
                              key={row.service}
                              onClick={() => clickHandler(row.nodename)}
                              style={{
                                cursor: "pointer",
                                color: darkmode ? "var(--bg-color)" : "#000000",
                              }}
                            >
                              {row.service}
                            </TableCell>
                            <TableCell
                              key={row.ndstatus}
                              onClick={() => clickHandler(row.nodename)}
                              style={{
                                cursor: "pointer",
                                color: darkmode ? "var(--bg-color)" : "#000000",
                              }}
                            >
                              {row.ndstatus}
                            </TableCell>
                            <TableCell
                              key={row.nodename}
                              onClick={() => clickHandler(row.nodename)}
                              style={{
                                cursor: "pointer",
                                color: darkmode
                                  ? "var(--bg-color)"
                                  : "var(--point-color)",
                              }}
                            >
                              {row.nodename}
                            </TableCell>
                            <TableCell
                              key={row.ndtype}
                              onClick={() => clickHandler(row.nodename)}
                              style={{
                                cursor: "pointer",
                                color: darkmode ? "var(--bg-color)" : "#000000",
                              }}
                            >
                              {row.ndtype}
                            </TableCell>
                            <TableCell
                              key={row.service_dcc}
                              onClick={() => clickHandler(row.nodename)}
                              style={{
                                cursor: "pointer",
                                color: darkmode ? "var(--bg-color)" : "#000000",
                              }}
                            >
                              {row.service_dcc}
                            </TableCell>
                            <TableCell
                              key={row.ipaddress}
                              onClick={() => clickHandler(row.nodename)}
                              style={{
                                cursor: "pointer",
                                color: darkmode ? "var(--bg-color)" : "#000000",
                              }}
                            >
                              {row.ipaddress}
                            </TableCell>
                            <TableCell
                              key={row.blocknum}
                              onClick={() =>
                                clickBlockHandler(row.blocknum, idx)
                              }
                              style={{
                                cursor: "pointer",
                                color: darkmode ? "var(--bg-color)" : "#000000",
                              }}
                            >
                              {row.blocknum}
                            </TableCell>
                            <TableCell
                              key={row.createdt}
                              onClick={() =>
                                clickBlockHandler(row.blocknum, idx)
                              }
                              style={{
                                cursor: "pointer",
                                color: darkmode ? "var(--bg-color)" : "#000000",
                              }}
                            >
                              {row.createdt}
                            </TableCell>
                            <TableCell key={row.tps}>{row.tps}</TableCell>
                            <TableCell key={row.latency}>
                              {row.latency}
                            </TableCell>
                          </TableRow>
                        ) : (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.code}
                          >
                            <TableCell
                              key={row.service}
                              onClick={() => clickHandler(row.nodename)}
                              style={{
                                cursor: "pointer",
                                color: darkmode ? "var(--bg-color)" : "#000000",
                              }}
                            >
                              {row.service}
                            </TableCell>
                            <TableCell
                              key={row.ndstatus}
                              onClick={() => clickHandler(row.nodename)}
                              style={{
                                cursor: "pointer",
                                color: darkmode ? "var(--bg-color)" : "#000000",
                              }}
                            >
                              {row.ndstatus}
                            </TableCell>
                            <TableCell
                              key={row.nodename}
                              onClick={() => clickHandler(row.nodename)}
                              style={{
                                cursor: "pointer",
                                color: darkmode
                                  ? "var(--bg-color)"
                                  : "var(--point-color)",
                              }}
                            >
                              {row.nodename}
                            </TableCell>
                            <TableCell
                              key={row.ndtype}
                              onClick={() => clickHandler(row.nodename)}
                              style={{
                                cursor: "pointer",
                                color: darkmode ? "var(--bg-color)" : "#000000",
                              }}
                            >
                              {row.ndtype}
                            </TableCell>
                            <TableCell
                              key={row.service_dcc}
                              onClick={() => clickHandler(row.nodename)}
                              style={{
                                cursor: "pointer",
                                color: darkmode ? "var(--bg-color)" : "#000000",
                              }}
                            >
                              {row.service_dcc}
                            </TableCell>
                            <TableCell
                              key={row.ipaddress}
                              onClick={() => clickHandler(row.nodename)}
                              style={{
                                cursor: "pointer",
                                color: darkmode ? "var(--bg-color)" : "#000000",
                              }}
                            >
                              http://xxx.xx.xxx.xxx:xxxxx
                            </TableCell>
                            <TableCell
                              key={row.blocknum}
                              onClick={() =>
                                clickBlockHandler(row.blocknum, idx)
                              }
                              style={{
                                cursor: "pointer",
                                color: darkmode ? "var(--bg-color)" : "#000000",
                              }}
                            >
                              {row.blocknum}
                            </TableCell>
                            <TableCell
                              key={row.createdt}
                              onClick={() =>
                                clickBlockHandler(row.blocknum, idx)
                              }
                              style={{
                                cursor: "pointer",
                                color: darkmode ? "var(--bg-color)" : "#000000",
                              }}
                            >
                              {row.createdt}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{ bgcolor: darkmode ? "var(--darkmode-color)" : "#fff" }}
              />
            </Paper>
            <Stack spacing={2}>
              <Pagination
                className="pagination"
                count={
                  rows.length % rowsPerPage === 0
                    ? parseInt(rows.length / rowsPerPage)
                    : parseInt(rows.length / rowsPerPage) + 1
                }
                page={pagenation}
                onChange={handleChange}
                showFirstButton
                showLastButton
                sx={{ bgcolor: darkmode ? "var(--darkmode-color)" : "#fff" }}
              />
            </Stack>
          </ThemeProvider>
        </div>
      ),
    },
    {
      tabTitle: (
        <div
          className={activeIndex === 1 ? "is-active right" : "tab"}
          onClick={() => tabClickHandler(1)}
        >
          {" "}
          전체 노드 자원 현황{" "}
        </div>
      ),
      tabCont: (
        <div>
          <Chart />
        </div>
      ),
    },
  ];

  const tabClickHandler = (index) => {
    setActiveIndex(index);
  };

  return (
    <>
      <div className="tabs">
        {tabContArr.map((section) => {
          return section.tabTitle;
        })}
      </div>

      <div>{tabContArr[activeIndex].tabCont}</div>
    </>
  );
}
