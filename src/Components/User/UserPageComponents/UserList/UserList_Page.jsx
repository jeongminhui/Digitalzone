import { getAuth } from 'firebase/auth';
import { collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../../../firebase';
import { useRecoilState } from 'recoil';
import { userInfoAtom } from '../../../../Recoil/Atom';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Stack } from '@mui/system';
import { IconButton, Pagination, TablePagination } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './UserList_Page.scss';
import Swal from 'sweetalert2';
import Modal1 from '../../../CommonComponents/Modal/Modal1';
import UserAdd_Page from '../UserAdd/UserAdd_Page';

const UserList_Page = () => {
    // 스테이트 저장소
    const [userlist, setUserlist] = useState([]);

    // firebase 연결
    const userCollection = collection(db, 'users');

    // 어스
    const auth = getAuth();

    // 리코일 스테이츠
    const [clickedUserInfo, setClickedUserInfo] = useRecoilState(userInfoAtom);

    // navigate
    const navigate = useNavigate();

    // 특정 유저 데이터 가져오기 -> 아톰 전달 / 수정 페이지 이동
    const onClickHandler = async (uid) => {
        const docRef = doc(userCollection, uid);
        const clickedUser = await getDoc(docRef);
        const clickedUserData = clickedUser.data();
        setClickedUserInfo(clickedUserData);
        navigate('/user/update');
    };
    console.log(clickedUserInfo);

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
            title: '삭제하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DA3849',
            cancelButtonColor: '#30A64A',
            confirmButtonText: '삭제',
            cancelButtonText: '취소',
        }).then((result) => {
            if (result.isConfirmed) {
                const deleteUser = async () => {
                    await deleteDoc(doc(db, 'users', uid));
                };
                deleteUser();
                Swal.fire({
                    icon: 'success',
                    title: '삭제되었습니다',
                    showConfirmButton: false,
                    timer: 2000,
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: '취소되었습니다',
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
        });
    };

    // 블트노 권한에 따른 OX 표시 함수
    const adminList = (data) => {
        if (data === true) {
            return '◯';
        } else {
            return '✕';
        }
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

    return (
        <div className='userList'>
            <div className='wrapper'>
                <h1 className='mainTitle'>사용자 정보</h1>
                <h3 className='subTitle'>
                    <span className='subBar'>|</span> 전체 사용자 {userlist.length}명
                </h3>
                <div className='addButtonBox'>
                    {/* <button className='addButton' onClick={addHandler}>
              추가
          </button> */}
                    <Modal1 buttonName='사용자 추가'>
                        <UserAdd_Page />
                    </Modal1>
                </div>
                <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 'none' }}>
                    <TableContainer sx={{ bgcolor: '#fff' }}>
                        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                            <TableHead>
                                <TableRow sx={{ maxHeight: '10px', bgcolor: '#F0F4FB', fontWeight: 'bold' }}>
                                    <TableCell align='center' rowSpan={2} width='5%'>
                                        번호
                                    </TableCell>
                                    <TableCell align='center' rowSpan={2} width='8%'>
                                        유형
                                    </TableCell>
                                    <TableCell align='center' rowSpan={2} width='8%'>
                                        이름
                                    </TableCell>
                                    <TableCell align='center' rowSpan={2} width='9%'>
                                        소속
                                    </TableCell>
                                    <TableCell align='center' rowSpan={2} width='10%'>
                                        이메일(아이디)
                                    </TableCell>
                                    <TableCell align='center' colSpan={5} width='28%'>
                                        상세정보 전근권한
                                    </TableCell>
                                    <TableCell align='center' rowSpan={2} width='10%'>
                                        이용중인
                                        <br />
                                        서비스
                                    </TableCell>
                                    <TableCell align='center' rowSpan={2} width='10%'>
                                        등록일자
                                    </TableCell>
                                    <TableCell align='center' rowSpan={2} width='5%'>
                                        상태
                                    </TableCell>
                                    <TableCell align='center' rowSpan={2} width='4%'>
                                        삭제
                                    </TableCell>
                                </TableRow>
                                <TableRow sx={{ bgcolor: '#F0F4FB', fontWeight: 'bold', height: '30px' }}>
                                    <TableCell align='center'>블록</TableCell>
                                    <TableCell align='center'>
                                        대시
                                        <br />
                                        보드
                                    </TableCell>
                                    <TableCell align='center'>
                                        트랜
                                        <br />
                                        잭션
                                    </TableCell>
                                    <TableCell align='center'>노드</TableCell>
                                    <TableCell align='center'>서비스</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {userlist.map((user, idx) => (
                                    <TableRow key={idx} onClick={(e) => onClickHandler(user.uid, e)} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component='th' scope='row' align='center' onClick={(e) => e.stopPropagation()}>
                                            {idx + 1}
                                        </TableCell>
                                        <TableCell component='th' scope='row' align='center' onClick={(e) => e.stopPropagation()}>
                                            {user.userclass}
                                        </TableCell>
                                        <TableCell component='th' scope='row' align='center' style={{ cursor: 'pointer' }}>
                                            {user.username}
                                        </TableCell>
                                        <TableCell component='th' scope='row' align='center' onClick={(e) => e.stopPropagation()}>
                                            {user.userteam}
                                        </TableCell>
                                        <TableCell component='th' scope='row' align='center' style={{ cursor: 'pointer' }}>
                                            {user.userid}
                                        </TableCell>
                                        <TableCell component='th' scope='row' align='center' onClick={(e) => e.stopPropagation()}>
                                            {adminList(user.useradmin.block)}
                                        </TableCell>
                                        <TableCell component='th' scope='row' align='center' onClick={(e) => e.stopPropagation()}>
                                            {adminList(user.useradmin.dashboard)}
                                        </TableCell>
                                        <TableCell component='th' scope='row' align='center' onClick={(e) => e.stopPropagation()}>
                                            {adminList(user.useradmin.transaction)}
                                        </TableCell>
                                        <TableCell component='th' scope='row' align='center' onClick={(e) => e.stopPropagation()}>
                                            {adminList(user.useradmin.node)}
                                        </TableCell>
                                        <TableCell component='th' scope='row' align='center' onClick={(e) => e.stopPropagation()}>
                                            {adminList(user.useradmin.service)}
                                        </TableCell>
                                        <TableCell component='th' scope='row' align='center' onClick={(e) => e.stopPropagation()}>
                                            {user.serviceCnt} Service(s)
                                        </TableCell>
                                        <TableCell component='th' scope='row' align='center' onClick={(e) => e.stopPropagation()}>
                                            {user.userdate}
                                        </TableCell>
                                        <TableCell component='th' scope='row' align='center' onClick={(e) => e.stopPropagation()}>
                                            {user.userstatus}
                                        </TableCell>
                                        <TableCell component='th' scope='row' align='center' onClick={(e) => e.stopPropagation()}>
                                            <IconButton aria-label='delete' type='submit' className='DeleteButton' onClick={(e) => deleteHandler(user.uid, e)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <div className='pagenationDIV'>
                            <div className='pagenation'>
                                <Stack spacing={2}>
                                    <Pagination
                                        count={userlist.length === rowsPerPage ? parseInt(userlist.length / rowsPerPage) : parseInt(userlist.length / rowsPerPage) + 1}
                                        page={pagenation}
                                        onChange={handleChange}
                                        showFirstButton
                                        showLastButton
                                    />
                                </Stack>
                            </div>
                            <div className='tablePagenation'>
                                <TablePagination rowsPerPageOptions={[10, 25, 100]} component='div' count={userlist.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
                            </div>
                        </div>
                    </TableContainer>
                </Paper>
            </div>
        </div>
    );
};

export default UserList_Page;
