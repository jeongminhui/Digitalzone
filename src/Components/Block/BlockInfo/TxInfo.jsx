import React, { useContext, useEffect, useState } from "react";
import "./BlockInfo.scss";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { HiOutlineDocumentText } from "react-icons/hi";
import { async } from "@firebase/util";
import { collection, getDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";
import Swal from "sweetalert2";
import { koKR } from "@mui/material/locale";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { Button, Modal } from "antd";
import { width } from "@mui/system";

import { useRecoilValue } from "recoil";
import { loginSelector } from "../../../Recoil/Selector";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../Context/ThemeContext";

const TxInfo = ({ txnum }) => {
  const txCollection = collection(db, "transaction");
  const [txInfo, setTxInfo] = useState({});

  // 다크모드
  const darkmodeTheme = useContext(ThemeContext);
  const darkmode = darkmodeTheme.isDarkMode;

  // 권한 설정
  const loginUser = useRecoilValue(loginSelector);
  const [tranUser, setTranUser] = useState(true);
  const [tranNum, setTranNum] = useState("");

  useEffect(() => {
    setTranUser(loginUser?.useradmin.transaction);
  }, []);

  useEffect(() => {
    async function getBlockInfo() {
      // 트랜잭션 상세 정보 로드
      const txRef = doc(txCollection, String(txnum));
      const txdata = await getDoc(txRef);
      setTxInfo(txdata.data());
    }
    getBlockInfo();
  }, [txnum]);

  const theme = createTheme({
    typography: {
      allVariants: {
        fontFamily: "Noto Sans KR",
        fontSize: 14,
        color: "#3d3d3d",
      },
    },
  });

  const columns = [
    {
      id: "txnum",
      label: "트랜잭션번호",
      minWidth: 110,
      backgroundColor: "#F0F4FB",
    },
    {
      id: "createdt",
      label: "타임스탬프",
      minWidth: 60,
      backgroundColor: "#F0F4FB",
    },
    {
      id: "txhash",
      label: "트랜잭션해시",
      minWidth: 170,
      backgroundColor: "#F0F4FB",
    },
    {
      id: "txsize",
      label: "트랜잭션크기",
      minWidth: 120,
      backgroundColor: "#F0F4FB",
    },
    {
      id: "txdata",
      label: "데이터",
      minWidth: 80,
      backgroundColor: "#F0F4FB",
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    tranUser
      ? setIsModalOpen(true)
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
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();

  const clickHandler = (txnum) => {
    tranUser
      ? navigate(`/transaction/${txnum}`)
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

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Paper
          sx={{ width: "100%", overflow: "hidden", boxShadow: "none" }}
          style={{ backgroundColor: "transparent" }}
        >
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      sx={{ fontWeight: "bold" }}
                      style={{
                        minWidth: column.minWidth,
                        backgroundColor: darkmode
                          ? "#434c6c"
                          : `${column.backgroundColor}`,
                        color: darkmode
                          ? "var(--bg-color)"
                          : "var(--dark-grey-color)",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={txInfo.code}
                  className="tableRow"
                >
                  <TableCell
                    onClick={() => clickHandler(txInfo.txnum)}
                    style={{
                      backgroundColor: darkmode
                        ? "var(--dark-color)"
                        : "inherit",
                      color: darkmode
                        ? "var(--bg-color)"
                        : "var(--dark-grey-color)",
                    }}
                  >
                    {txInfo.txnum}
                  </TableCell>
                  <TableCell
                    onClick={() => clickHandler(txInfo.txnum)}
                    style={{
                      backgroundColor: darkmode
                        ? "var(--dark-color)"
                        : "inherit",
                      color: darkmode
                        ? "var(--bg-color)"
                        : "var(--dark-grey-color)",
                    }}
                  >
                    {txInfo.createdt}
                  </TableCell>
                  <TableCell
                    onClick={() => clickHandler(txInfo.txnum)}
                    style={{
                      backgroundColor: darkmode
                        ? "var(--dark-color)"
                        : "inherit",
                      color: darkmode
                        ? "var(--bg-color)"
                        : "var(--dark-grey-color)",
                    }}
                  >
                    {txInfo.txhash}
                  </TableCell>
                  <TableCell
                    onClick={() => clickHandler(txInfo.txnum)}
                    style={{
                      backgroundColor: darkmode
                        ? "var(--dark-color)"
                        : "inherit",
                      color: darkmode
                        ? "var(--bg-color)"
                        : "var(--dark-grey-color)",
                    }}
                  >
                    {txInfo.txsize} KB
                  </TableCell>
                  <TableCell
                    style={{
                      backgroundColor: darkmode
                        ? "var(--dark-color)"
                        : "inherit",
                      color: darkmode
                        ? "var(--bg-color)"
                        : "var(--dark-grey-color)",
                    }}
                  >
                    <button
                      type="button"
                      onClick={showModal}
                      className="modalBtn"
                    >
                      <HiOutlineDocumentText
                        className="modalIcon"
                        style={{
                          stroke: darkmode
                            ? "var(--bg-color)"
                            : "var(--dark-grey-color)",
                        }}
                      />
                    </button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </ThemeProvider>
      <Modal
        open={isModalOpen}
        title="트랜잭션 데이터 상세"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <p className="txdataBox">{JSON.stringify(txInfo.txdata, null, 2)}</p>
      </Modal>
    </div>
  );
};

export default TxInfo;
