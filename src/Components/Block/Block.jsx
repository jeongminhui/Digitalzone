import React, { useEffect, useState } from "react";
import "./Block.scss";
import Footer from "../Footer/Footer";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
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
import { useNavigate } from "react-router-dom";

const Block = () => {
  const blockCollection = collection(db, "block1");
  const [rows, setRows] = useState([]);

  const columns = [
    { id: "service", label: "서비스명", minWidth: 170 },
    { id: "blocknum", label: "블록번호", minWidth: 100 },
    {
      id: "createdt",
      label: "타임스탬프",
      minWidth: 170,
      // align: "right",
    },
    {
      id: "blockhash",
      label: "블록해시",
      minWidth: 170,
      // align: "right",
    },
    {
      id: "blksize",
      label: "블록크기",
      minWidth: 170,
      // align: "right",
    },
    {
      id: "txcount",
      label: "트랜잭션 수",
      minWidth: 170,
      // align: "right",
    },
  ];

  useEffect(() => {
    async function getBlocks() {
      const data = await getDocs(blockCollection);
      data.docs.map((items) => {
        return makeBlockData(items.data());
      });
    }
    getBlocks();
  }, []);

  // row 구조
  const makeBlockData = (item) => {
    setRows((prev) => [
      ...prev,
      {
        service: item.service,
        blocknum: item.blocknum,
        createdt: item.createdt,
        blockhash: item.blockhash,
        blksize: item.blksize,
        txnum: item.txnum,
      },
    ]);
  };

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

  // navigation 블록 상세 이동
  const [blocknum, setBlocknum] = useState("");
  const navigate = useNavigate();

  const clickHandler = (e) => {
    setBlocknum(e.target.value);
    console.log(e);
    navigate(`/block/${blocknum}`);
  };

  useEffect(() => {
    navigate(`/block/${blocknum}`);
  }, [blocknum]);

  return (
    <div className="Block">
      <h1>블록 페이지 입니다</h1>
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
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      <TableCell key={row.service}>{row.service}</TableCell>
                      <TableCell
                        key={row.blocknum}
                        onClick={clickHandler}
                        value={row.blocknum}
                      >
                        {row.blocknum}
                      </TableCell>
                      <TableCell key={row.createdt}>{row.createdt}</TableCell>
                      <TableCell key={row.blockhash}>{row.blockhash}</TableCell>
                      <TableCell key={row.blksize}>{row.blksize}</TableCell>
                      <TableCell key={row.txnum}>{row.txnum.length}</TableCell>

                      {/* {columns.map((column) => {
                        const value = row[column.id];
                        // console.log(value);
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })} */}
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
        />
      </Paper>

      <Stack spacing={2}>
        <Pagination
          count={parseInt(rows.length / rowsPerPage)}
          page={pagenation}
          onChange={handleChange}
          showFirstButton
          showLastButton
        />
      </Stack>
      <Footer />
    </div>
  );
};

export default Block;