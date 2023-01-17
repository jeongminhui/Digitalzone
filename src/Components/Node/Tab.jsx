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
import { createTheme, ThemeProvider, Tooltip } from '@mui/material';
import { koKR } from '@mui/material/locale';
import { useNavigate } from 'react-router-dom';
import './Tab.scss';
import Chart from './Chart'
import { useRecoilState } from "recoil";
import { currentBlockAtom } from "../../Recoil/Atom";
import Swal from 'sweetalert2';
import { useRecoilValue } from 'recoil';
import { loginSelector } from '../../Recoil/Selector';
import Refresh from './Refresh';
import "./Refresh.scss";


export default function Tab({ rows }) {
  // 권한 설정
  const loginUser = useRecoilValue(loginSelector);
  const [NodeUser, setNodeUser] = useState(false);

  useEffect(() => {
    setNodeUser(loginUser?.useradmin.node);
  }, []);

  let columns = [];
  NodeUser
    ? (columns = [
        { id: "service", label: "서비스명", minWidth: 70, align: "center" },
        { id: "ndstatus", label: "상태", minWidth: 70, align: "center" },
        { id: "nodename", label: "노드명", minWidth: 70, color: "#4669f5", align: "center" },
        { id: "ndtype", label: "유형", minWidth: 70, align: "center" },
        { id: "service_dcc", label: "서비스명", minWidth: 70, align: "center" },
        { id: "ipaddress", label: "IP", minWidth: 170, align: "center" },
        { id: "blocknum", label: "최신블록번호", minWidth: 100, align: "center" },
        { id: "createdt", label: "최신블록시간", minWidth: 170, align: "center" },
        { id: "tps", label: "처리속도(TPS)", minWidth: 50, align: "center" },
        { id: "latency", label: "지연율(Latency)", minWidth: 70, align: "center" },
      ])
    : (columns = [
        { id: "service", label: "서비스명", minWidth: 70, align: "center" },
        { id: "ndstatus", label: "상태", minWidth: 70, align: "center" },
        { id: "nodename", label: "노드명", minWidth: 70, color: "#4669f5", align: "center" },
        { id: "ndtype", label: "유형", minWidth: 70, align: "center" },
        { id: "service_dcc", label: "서비스명", minWidth: 70, align: "center" },
        { id: "ipaddress", label: "IP", minWidth: 170, align: "center" },
        { id: "blocknum", label: "최신블록번호", minWidth: 100, align: "center" },
        { id: "createdt", label: "최신블록시간", minWidth: 170, align: "center" },
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
          confirmButtonColor: "#4665f9",
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
        navigate(`/node/${nodeName}`)
    },[nodeName]);
    
// Tab
 const [activeIndex, setActiveIndex] = useState(0);
  
 const tabContArr=[
        {
            tabTitle:<div className={activeIndex===0 ? "is-active left" : "tab"} onClick={()=>tabClickHandler(0)}> 노드 목록 </div>,
            tabCont:<div>
                  <Refresh/>
                 <ThemeProvider theme={theme}>
                 <Paper sx={{ width: "100%", overflow: "hidden", boxShadow: "none"}}>
        <TableContainer sx={{ maxHeight: 440, bgcolor:'background.content' }}>
          <Table stickyHeader aria-label="sticky table"  >
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell 
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, color: column.color}}
                    sx={{bgcolor:'background.paper', fontWeight:'bold'}}
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

                    NodeUser ? 
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      
                      <TableCell key={row.service} onClick={() => clickHandler(row.nodename)} style={{cursor : 'pointer'}} align="center">{row.service}</TableCell>
                      <TableCell key={row.ndstatus} onClick={() => clickHandler(row.nodename)} style={{cursor : 'pointer'}} align="center">{row.ndstatus}</TableCell>
                      <TableCell key={row.nodename} onClick={() => clickHandler(row.nodename)} style={{cursor : 'pointer', color:'#4669f5'}} align="center">{row.nodename}</TableCell>
                      <TableCell key={row.ndtype} onClick={() => clickHandler(row.nodename)} style={{cursor : 'pointer'}} align="center">{row.ndtype}</TableCell>
                      <TableCell key={row.service_dcc} onClick={() => clickHandler(row.nodename)} style={{cursor : 'pointer'}} align="center">{row.service_dcc}</TableCell>
                      <TableCell key={row.ipaddress} onClick={() => clickHandler(row.nodename)} style={{cursor : 'pointer'}} align="center">{row.ipaddress}</TableCell>
                      <Tooltip title="해당 블록의 상세페이지로 이동합니다." arrow><TableCell key={row.blocknum} onClick={() => clickBlockHandler(row.blocknum, idx)} style={{cursor : 'pointer'}} >{row.blocknum}</TableCell></Tooltip>
                      <Tooltip title="해당 블록의 상세페이지로 이동합니다." arrow><TableCell key={row.createdt} onClick={() => clickBlockHandler(row.blocknum, idx)} style={{cursor : 'pointer'}}>{row.createdt}</TableCell></Tooltip>
                      <TableCell key={row.tps} align="center">{row.tps}</TableCell>
                      <TableCell key={row.latency} align="center">{row.latency}</TableCell>

                      
                    </TableRow>
                    :
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      
                      <TableCell key={row.service} onClick={() => clickHandler(row.nodename)} style={{cursor : 'pointer'}} align="center">{row.service}</TableCell>
                      <TableCell key={row.ndstatus} onClick={() => clickHandler(row.nodename)} style={{cursor : 'pointer'}} align="center">{row.ndstatus}</TableCell>
                      <TableCell key={row.nodename} onClick={() => clickHandler(row.nodename)} style={{cursor : 'pointer', color:'#4669f5'}} align="center">{row.nodename}</TableCell>
                      <TableCell key={row.ndtype} onClick={() => clickHandler(row.nodename)} style={{cursor : 'pointer'}} align="center">{row.ndtype}</TableCell>
                      <TableCell key={row.service_dcc} onClick={() => clickHandler(row.nodename)} style={{cursor : 'pointer'}} align="center">{row.service_dcc}</TableCell>
                      <TableCell key={row.ipaddress} onClick={() => clickHandler(row.nodename)} style={{cursor : 'pointer'}} align="center">http://xxx.xx.xxx.xxx:xxxxx</TableCell>
                      <Tooltip title="해당 블록의 상세페이지로 이동합니다." arrow><TableCell key={row.blocknum} onClick={() => clickBlockHandler(row.blocknum, idx)} style={{cursor : 'pointer'}} align="center">{row.blocknum}</TableCell></Tooltip>
                      <Tooltip title="해당 블록의 상세페이지로 이동합니다." arrow><TableCell key={row.createdt} onClick={() => clickBlockHandler(row.blocknum, idx)} style={{cursor : 'pointer'}} align="center">{row.createdt}</TableCell></Tooltip>
                      
                      
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
          sx={{bgcolor:'background.content'}}
        />
      </Paper>
      <Stack spacing={2}>
        <Pagination className='pagination'
          count={
            rows.length % rowsPerPage === 0 
              ? parseInt(rows.length / rowsPerPage)
              : parseInt(rows.length / rowsPerPage) + 1
          }
          page={pagenation}
          onChange={handleChange}
          showFirstButton
          showLastButton
          sx={{bgcolor:'background.content'}}
          />
      </Stack>
    </ThemeProvider>
       </div>
        },
        {
            tabTitle:<div className={activeIndex===1 ? "is-active right" : "tab"} onClick={()=>tabClickHandler(1)}> 전체 노드 자원 현황 </div>,
            tabCont:<div>
              <Chart/>
              </div>
        }
    ];
    
    const tabClickHandler=(index)=>{
        setActiveIndex(index)
    }

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
