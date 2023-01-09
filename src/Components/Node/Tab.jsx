import { useEffect, useState } from "react";
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
import Grafana from "./Grafana";
import "./Tab.scss";

export default function Tab({ rows }) {
  const columns = [
    { id: "service", label: "서비스명", minWidth: 70 },
    { id: "ndstatus", label: "상태", minWidth: 70 },
    { id: "nodename", label: "노드명", minWidth: 70 },
    { id: "ndtype", label: "유형", minWidth: 70 },
    { id: "service_dcc", label: "서비스명", minWidth: 70 },
    { id: "ipaddress", label: "IP", minWidth: 170 },
    { id: "blocknum", label: "최신블록번호", minWidth: 100 },
    { id: "createdt", label: "최신블록시간", minWidth: 170 },
    { id: "tps", label: "처리속도(TPS)", minWidth: 50 },
    { id: "latency", label: "지연율(Latency)", minWidth: 70 },
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

  // pagenation
  const [pagenation, setPagenation] = useState(1);
  const [count, setCount] = useState(10);

  const handleChange = (event, value) => {
    setPagenation(value);
  };

  useEffect(() => {
    setPage(pagenation - 1);
  }, [pagenation]);

  // css
  const theme = createTheme(
    {
      palette: {
        background: {
          paper: "#F0F4FB",
          content: "#ffffff",
        },
      },
    },
    koKR
  );

  // navigation
  const navigate = useNavigate();
  const [nodeName, setNodeName] = useState("");

  const clickHandler = (nodename) => {
    setNodeName(nodename);
  };

  useEffect(() => {
    navigate(`/node/${nodeName}`);
  }, [navigate, nodeName]);

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
          <ThemeProvider theme={theme}>
            <Paper
              sx={{
                width: "1180px",
                overflow: "hidden",
                margin: "15px 0px 15px 0px;",
              }}
            >
              <TableContainer
                sx={{ maxHeight: 440, bgcolor: "background.content" }}
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
                            bgcolor: "background.paper",
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
                      .map((row) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.code}
                          >
                            <TableCell
                              key={row.service}
                              onClick={() => clickHandler(row.nodename)}
                              style={{ cursor: "pointer" }}
                            >
                              {row.service}
                            </TableCell>
                            <TableCell
                              key={row.ndstatus}
                              onClick={() => clickHandler(row.nodename)}
                              style={{ cursor: "pointer" }}
                            >
                              {row.ndstatus}
                            </TableCell>
                            <TableCell
                              key={row.nodename}
                              onClick={() => clickHandler(row.nodename)}
                              style={{ cursor: "pointer" }}
                            >
                              {row.nodename}
                            </TableCell>
                            <TableCell
                              key={row.ndtype}
                              onClick={() => clickHandler(row.nodename)}
                              style={{ cursor: "pointer" }}
                            >
                              {row.ndtype}
                            </TableCell>
                            <TableCell
                              key={row.service_dcc}
                              onClick={() => clickHandler(row.nodename)}
                              style={{ cursor: "pointer" }}
                            >
                              {row.service_dcc}
                            </TableCell>
                            <TableCell
                              key={row.ipaddress}
                              onClick={() => clickHandler(row.nodename)}
                              style={{ cursor: "pointer" }}
                            >
                              {row.ipaddress}
                            </TableCell>
                            <TableCell key={row.blocknum}>
                              {row.blocknum}
                            </TableCell>
                            <TableCell key={row.createdt}>
                              {row.createdt}
                            </TableCell>
                            <TableCell key={row.tps}>{row.tps}</TableCell>
                            <TableCell key={row.latency}>
                              {row.latency}
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
                sx={{ bgcolor: "background.content" }}
              />
            </Paper>
          </ThemeProvider>
          <Stack spacing={2}>
            <Pagination
              className="pagination"
              count={
                rows.length === rowsPerPage
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
        <div className="graph">
          <Grafana />
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
        {tabContArr.map((section, index) => {
          return section.tabTitle;
        })}
      </div>

      <div>{tabContArr[activeIndex].tabCont}</div>
    </>
  );
}
