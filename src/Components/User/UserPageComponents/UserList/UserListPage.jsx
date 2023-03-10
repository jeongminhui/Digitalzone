import { getAuth } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../../firebase";
import { useRecoilState } from "recoil";
import { userInfoAtom } from "../../../../Recoil/Atom";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { koKR } from "@mui/material/locale";
import { Stack } from "@mui/system";
import { IconButton, Pagination, TablePagination } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./UserListPage.scss";
import Swal from "sweetalert2";
import UserAddModal from "../UserAdd/Components/UserAddModal";
import Footer from "../../../Footer/Footer";
import { useRecoilValue } from "recoil";
import { loginSelector } from "../../../../Recoil/Selector";
// 민희추가
import UserUpdate from "../UserUpdate/Components/UserUpdate";
import { Button, Modal } from "antd";
// import "./UserListPage.scss";
import { useContext } from "react";
import { ThemeContext } from "../../../Context/ThemeContext";

const UserListPage = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  // 위의 것 민희추가

  // 다크모드
  const darkmodeTheme = useContext(ThemeContext);
  const darkmode = darkmodeTheme.isDarkMode;

  // pagination css
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

  // 스테이트 저장소
  const [userlist, setUserlist] = useState([]);

  // firebase 연결
  const userCollection = collection(db, "users");

  // 어스
  const auth = getAuth();

  // 리코일 스테이츠
  const [clickedUserInfo, setClickedUserInfo] = useRecoilState(userInfoAtom);
  const loginUser = useRecoilValue(loginSelector);

  // navigate
  const navigate = useNavigate();

  // 특정 유저 데이터 가져오기 -> 아톰 전달 / 수정 페이지 이동
  const onClickHandler = async (uid) => {
    const docRef = doc(userCollection, uid);
    const clickedUser = await getDoc(docRef);
    const clickedUserData = clickedUser.data();
    setClickedUserInfo(clickedUserData);
    // navigate("/user/update");
    // 모달 오픈 함수
    showModal();
  };

  // 전체 유저 데이터 가져오기
  useEffect(() => {
    async function getUsers() {
      const data = await getDocs(userCollection);
      setUserlist(
        data.docs.map((item) => ({
          ...item.data(),
        }))
      );
    }
    getUsers();
  }, []);

  // 특정 유저 데이터 삭제하기
  const deleteHandler = async (uid, e) => {
    e.preventDefault();
    Swal.fire({
      text: "삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DA3849",
      cancelButtonColor: "#30A64A",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
      color: darkmode ? "var(--bg-color)" : "#545454",
      background: darkmode ? "var(--darkmode-color)" : "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteUser = async () => {
          await deleteDoc(doc(db, "users", uid));
        };
        deleteUser();
        Swal.fire({
          icon: "success",
          text: "삭제되었습니다",
          showConfirmButton: false,
          timer: 2000,
          color: darkmode ? "var(--bg-color)" : "#545454",
          background: darkmode ? "var(--darkmode-color)" : "#fff",
        });
        setTimeout(() => {
          window.location.reload();
        }, 2100);
      } else {
        Swal.fire({
          icon: "error",
          text: "취소되었습니다",
          showConfirmButton: false,
          timer: 2000,
          color: darkmode ? "var(--bg-color)" : "#545454",
          background: darkmode ? "var(--darkmode-color)" : "#fff",
        });
      }
    });
  };

  // 블트노 권한에 따른 OX 표시 함수
  const adminList = (data) => {
    if (data === true) {
      return "◯";
    } else {
      return "✕";
    }
  };

  // 사용자 정보 업데이트 하면 Modal 닫고 새로고침
  const updateHandler = () => {
    setTimeout(() => {
      setOpen(false);
    }, 2200);
    // 모달창 닫고나서 user 새로고침
    setTimeout(() => {
      window.location.reload();
    }, 2300);
  };

  // 사용자 추가
  const addHandler = () => {};

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

  return loginUser.userclass === "관리자" ? (
    <ThemeProvider theme={theme}>
      <div className="userList">
        <div className="wrapper">
          <h1 className="mainTitle">사용자 정보</h1>
          <h3 className="subTitle">
            <span className="leftItem">
              <span className="subBar">|</span> 전체 사용자 {userlist.length}명
            </span>
            <UserAddModal className="modal" />
          </h3>

          <Paper sx={{ width: "100%", overflow: "hidden", boxShadow: "none" }}>
            <TableContainer
              sx={{ bgcolor: darkmode ? "var(--darkmode-color)" : "#fff" }}
            >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow
                    sx={{
                      maxHeight: "10px",
                      bgcolor: darkmode ? "var(--dark-table-color)" : "#F0F4FB",
                      // color: darkmode ? "#F0F4FB" : "#000000",
                      fontWeight: "bold",
                    }}
                  >
                    <TableCell
                      align="center"
                      rowSpan={2}
                      width="5%"
                      style={{
                        color: darkmode ? "var(--bg-color)" : "#000000",
                      }}
                    >
                      번호
                    </TableCell>
                    <TableCell
                      align="center"
                      rowSpan={2}
                      width="8%"
                      style={{
                        color: darkmode ? "var(--bg-color)" : "#000000",
                      }}
                    >
                      유형
                    </TableCell>
                    <TableCell
                      align="center"
                      rowSpan={2}
                      width="8%"
                      style={{
                        color: darkmode
                          ? "var(--bg-color)"
                          : "var(--point-color)",
                      }}
                    >
                      이름
                    </TableCell>
                    <TableCell
                      align="center"
                      rowSpan={2}
                      width="9%"
                      style={{
                        color: darkmode ? "var(--bg-color)" : "#000000",
                      }}
                    >
                      소속
                    </TableCell>
                    <TableCell
                      align="center"
                      rowSpan={2}
                      width="10%"
                      style={{
                        color: darkmode ? "var(--bg-color)" : "#000000",
                      }}
                    >
                      이메일(아이디)
                    </TableCell>
                    <TableCell
                      align="center"
                      colSpan={5}
                      width="28%"
                      style={{
                        color: darkmode ? "var(--bg-color)" : "#000000",
                      }}
                    >
                      상세정보 접근권한
                    </TableCell>
                    <TableCell
                      align="center"
                      rowSpan={2}
                      width="10%"
                      style={{
                        color: darkmode ? "var(--bg-color)" : "#000000",
                      }}
                    >
                      이용중인
                      <br />
                      서비스
                    </TableCell>
                    <TableCell
                      align="center"
                      rowSpan={2}
                      width="10%"
                      style={{
                        color: darkmode ? "var(--bg-color)" : "#000000",
                      }}
                    >
                      등록일자
                    </TableCell>
                    <TableCell
                      align="center"
                      rowSpan={2}
                      width="5%"
                      style={{
                        color: darkmode ? "var(--bg-color)" : "#000000",
                      }}
                    >
                      상태
                    </TableCell>
                    <TableCell
                      align="center"
                      rowSpan={2}
                      width="4%"
                      style={{
                        color: darkmode ? "var(--bg-color)" : "#000000",
                      }}
                    >
                      삭제
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      bgcolor: darkmode ? "var(--dark-table-color)" : "#F0F4FB",
                      // color: darkmode ? "#F0F4FB" : "#000000",
                      fontWeight: "bold",
                      height: "30px",
                    }}
                  >
                    <TableCell
                      align="center"
                      style={{
                        color: darkmode ? "var(--bg-color)" : "#000000",
                      }}
                    >
                      블록
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        color: darkmode ? "var(--bg-color)" : "#000000",
                      }}
                    >
                      대시
                      <br />
                      보드
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        color: darkmode ? "var(--bg-color)" : "#000000",
                      }}
                    >
                      트랜
                      <br />
                      잭션
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        color: darkmode ? "var(--bg-color)" : "#000000",
                      }}
                    >
                      노드
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        color: darkmode ? "var(--bg-color)" : "#000000",
                      }}
                    >
                      서비스
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userlist
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user, idx) => (
                      <TableRow
                        key={idx}
                        onClick={(e) => onClickHandler(user.uid, e)}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            color: darkmode ? "var(--bg-color)" : "#000000",
                          }}
                        >
                          {idx + 1}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            color: darkmode ? "var(--bg-color)" : "#000000",
                          }}
                        >
                          {user.userclass}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                          style={{
                            cursor: "pointer",
                            color: darkmode ? "var(--bg-color)" : "#4665f9",
                          }}
                          onClick={showModal}
                        >
                          {user.username}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            color: darkmode ? "var(--bg-color)" : "#000000",
                          }}
                        >
                          {user.userteam}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                          style={{
                            cursor: "pointer",
                            color: darkmode ? "var(--bg-color)" : "#000000",
                          }}
                          onClick={showModal}
                        >
                          {user.userid}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            color: darkmode ? "var(--bg-color)" : "#000000",
                          }}
                        >
                          {adminList(user.useradmin.block)}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            color: darkmode ? "var(--bg-color)" : "#000000",
                          }}
                        >
                          {adminList(user.useradmin.dashboard)}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            color: darkmode ? "var(--bg-color)" : "#000000",
                          }}
                        >
                          {adminList(user.useradmin.transaction)}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            color: darkmode ? "var(--bg-color)" : "#000000",
                          }}
                        >
                          {adminList(user.useradmin.node)}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            color: darkmode ? "var(--bg-color)" : "#000000",
                          }}
                        >
                          {adminList(user.useradmin.service)}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            color: darkmode ? "var(--bg-color)" : "#000000",
                          }}
                        >
                          {user.serviceCnt} Service(s)
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            color: darkmode ? "var(--bg-color)" : "#000000",
                          }}
                        >
                          {user.userdate}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            color: darkmode ? "var(--bg-color)" : "#000000",
                          }}
                        >
                          {user.userstatus}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            color: darkmode ? "var(--bg-color)" : "#000000",
                          }}
                        >
                          <IconButton
                            aria-label="delete"
                            type="submit"
                            className="DeleteButton"
                            onClick={(e) => deleteHandler(user.uid, e)}
                            sx={{
                              color: darkmode ? "var(--footer-color)" : "",
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <div className="pagenationDIV">
                <div className="tablePagenation">
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={userlist.length}
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
                        userlist.length % rowsPerPage === 0
                          ? parseInt(userlist.length / rowsPerPage)
                          : parseInt(userlist.length / rowsPerPage) + 1
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
          {/* 여기부터 모달! */}

          <div className="updateModal">
            <Modal
              open={open}
              // title="Title"
              onOk={handleOk}
              onCancel={handleCancel}
              footer={[]}
              width={650}
              // centered={true}
              style={{ width: "max-content" }}
            >
              <UserUpdate
                updateOk={updateHandler}
                style={{ width: "max-content" }}
              />
            </Modal>
          </div>
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  ) : (
    navigate("/404NotFound")
  );
};

export default UserListPage;
