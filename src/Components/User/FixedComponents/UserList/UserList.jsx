import { collection, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../../../firebase';
import { useRecoilState } from 'recoil';
import { userInfoAtom } from '../../../../Recoil/Atom';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const UserList = () => {
    // 스테이트 저장소
    const [userlist, setUserlist] = useState([]);

    // firebase 연결
    const userCollection = collection(db, 'users');

    // 리코일 스테이츠
    const [clickedUserInfo, setClickedUserInfo] = useRecoilState(userInfoAtom);

    const navigate = useNavigate();

    // 특정 유저 데이터 가져오기 -> 아톰 전달 / 수정 페이지 이동
    const onClickHandler = async (uid) => {
        const docRef = doc(userCollection, uid);
        const clickedUser = await getDoc(docRef);
        const clickedUserData = clickedUser.data();
        setClickedUserInfo(clickedUserData);
        navigate('/userupdate');
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
            title: '삭제하시겠습니까?',
            // text: "You won't be able to revert this!",
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
                    confirmButtonColor: '#4665f9',
                    icon: 'success',
                    title: '삭제되었습니다',
                    confirmButtonText: '확인',
                });
            } else {
                Swal.fire({
                    confirmButtonColor: '#4665f9',
                    icon: 'error',
                    title: '취소되었습니다',
                    confirmButtonText: '확인',
                });
            }
        });
    };

    // 블트노 권한에 따른 OX 표시 함수
    const adminList = (data) => {
        if (data === true) {
            return '○';
        } else {
            return '✕';
        }
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>유형</th>
                        <th>이름</th>
                        <th>소속</th>
                        <th>이메일(아이디)</th>
                        <th>대시보드</th>
                        <th>블록</th>
                        <th>트랜잭션</th>
                        <th>노드</th>
                        <th>서비스</th>
                        <th>이용중인 서비스</th>
                        <th>등록일자</th>
                        <th>상태</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {userlist.map((user, idx) => (
                        <tr key={idx} onClick={(e) => onClickHandler(user.uid, e)}>
                            <td onClick={(e) => e.stopPropagation()}>{idx + 1}</td>
                            <td onClick={(e) => e.stopPropagation()}>{user.userclass}</td>
                            <td style={{ cursor: 'pointer' }}>{user.username}</td>
                            <td onClick={(e) => e.stopPropagation()}>{user.userteam}</td>
                            <td style={{ cursor: 'pointer' }}>{user.userid}</td>
                            <td onClick={(e) => e.stopPropagation()}>{adminList(user.useradmin.dashboard)}</td>
                            <td onClick={(e) => e.stopPropagation()}>{adminList(user.useradmin.block)}</td>
                            <td onClick={(e) => e.stopPropagation()}>{adminList(user.useradmin.transaction)}</td>
                            <td onClick={(e) => e.stopPropagation()}>{adminList(user.useradmin.node)}</td>
                            <td onClick={(e) => e.stopPropagation()}>{adminList(user.useradmin.service)}</td>
                            <td onClick={(e) => e.stopPropagation()}>{user.serviceCnt}</td>
                            <td onClick={(e) => e.stopPropagation()}>{user.userdate}</td>
                            <td onClick={(e) => e.stopPropagation()}>{user.userstatus}</td>
                            <td onClick={(e) => e.stopPropagation()}>
                                <button type='submit' className='DeleteButton' onClick={(e) => deleteHandler(user.uid, e)}>
                                    삭제
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
