import React, { useState, useEffect } from 'react';
import { db } from '../../../../../firebase';
import { collection, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useRecoilValue } from 'recoil';
import { userInfoSelector } from '../../../../../Recoil/Selector';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const UserUpdate = () => {
    const updateUser = useRecoilValue(userInfoSelector);
    const [user, setUser] = useState({});
    // 상세정보 접근 권한
    const [admin, setAdmin] = useState({
        dashboard: true,
        block: true,
        transaction: false,
        node: false,
        service: false,
    });
    const [tran, setTran] = useState(false);
    const [node, setNode] = useState(false);
    const [serv, setServ] = useState(false);
    // 이용중인 서비스
    const [userservice, setUserservice] = useState({
        service_a: false,
        service_b: false,
        service_c: false,
        service_d: false,
        service_e: false,
    });
    const [svcA, setSvcA] = useState(false);
    const [svcB, setSvcB] = useState(false);
    const [svcC, setSvcC] = useState(false);
    const [svcD, setSvcD] = useState(false);
    const [svcE, setSvcE] = useState(false);
    // 서비스 카운트
    const [serviceCnt, setServiceCnt] = useState(0);

    const navigate = useNavigate();
    const userCollection = collection(db, 'users');

    // 로그인한 사용자 정보 가져오기
    useEffect(() => {
        setUser(updateUser);
        setAdmin(user.useradmin);
        setUserservice(user.userservice);
        setServiceCnt(user.serviceCnt);
    }, [updateUser, user]);

    // 접근 권한 가져오기
    useEffect(() => {
        if (admin) {
            setTran(admin.transaction);
            setNode(admin.node);
            setServ(admin.service);
        }
    }, [admin]);

    // 서비스 권한 가져오기
    useEffect(() => {
        if (userservice) {
            setSvcA(userservice.service_a);
            setSvcB(userservice.service_b);
            setSvcC(userservice.service_c);
            setSvcD(userservice.service_d);
            setSvcE(userservice.service_e);
        }
    }, [userservice]);

    // 접근 권한 변경
    const adminChangeHandler = (e) => {
        setAdmin({
            ...admin,
            [e.target.id]: e.target.checked,
        });
    };

    // 서비스 권한 변경
    const serviceChangeHandler = (e) => {
        setUserservice({
            ...userservice,
            [e.target.id]: e.target.checked,
        });
        if (e.target.checked === true) setServiceCnt((prev) => prev + 1);
        else setServiceCnt((prev) => prev - 1);
    };

    // 변경한 정보 db에 저장
    const changeHandler = async (e) => {
        e.preventDefault();
        await updateDoc(doc(userCollection, user.uid), {
            ...user,
            useradmin: {
                ...admin,
            },
            userservice: {
                ...userservice,
            },
            serviceCnt: serviceCnt,
        });
        Swal.fire({
            icon: 'success',
            text: '정보를 변경했습니다',
            showConfirmButton: false,
            timer: 2000,
        });
        setServiceCnt(0);
        // /user/list를 /user로 경로 변경할 때 같이 경로 변경
        navigate('/user/list');
    };

    // 정보 삭제
    const deleteHandler = async (e) => {
        e.preventDefault();
        Swal.fire({
            text: '삭제하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DA3849',
            cancelButtonColor: '#30A64A',
            confirmButtonText: '삭제',
            cancelButtonText: '취소',
        }).then((result) => {
            if (result.isConfirmed) {
                const deleteUser = async () => {
                    await deleteDoc(doc(db, 'users', user.uid));
                };
                deleteUser();
                Swal.fire({
                    icon: 'success',
                    text: '삭제되었습니다',
                    showConfirmButton: false,
                    timer: 2000,
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    text: '취소되었습니다',
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
        });
    };

    return (
        <div>
            <div>{user.username}</div>
            <div>{user.userteam}</div>
            <div>아이디(이메일) {user.userid}</div>
            <form>
                <div>
                    상세정보 접근 권한
                    <label>
                        <input type='checkbox' checked disabled />
                        대시보드
                    </label>
                    <label>
                        <input type='checkbox' checked disabled />
                        블록
                    </label>
                    <label>
                        {tran ? <input type='checkbox' id='transaction' name='checkbox' checked onChange={adminChangeHandler} /> : <input type='checkbox' id='transaction' name='checkbox' onChange={adminChangeHandler} />}
                        트랜잭션
                    </label>
                    <label>
                        {node ? <input type='checkbox' id='node' name='checkbox' checked onChange={adminChangeHandler} /> : <input type='checkbox' id='node' name='checkbox' onChange={adminChangeHandler} />}
                        노드
                    </label>
                    <label>
                        {serv ? <input type='checkbox' id='service' name='checkbox' checked onChange={adminChangeHandler} /> : <input type='checkbox' id='service' name='checkbox' onChange={adminChangeHandler} />}
                        서비스
                    </label>
                </div>
                <div>
                    이용중인 서비스:
                    <label>
                        {svcA ? <input type='checkbox' id='service_a' name='checkbox' checked onChange={serviceChangeHandler} /> : <input type='checkbox' id='service_a' name='checkbox' onChange={serviceChangeHandler} />}
                        A서비스
                    </label>
                    <label>
                        {svcB ? <input type='checkbox' id='service_b' name='checkbox' checked onChange={serviceChangeHandler} /> : <input type='checkbox' id='service_b' name='checkbox' onChange={serviceChangeHandler} />}
                        B서비스
                    </label>
                    <label>
                        {svcC ? <input type='checkbox' id='service_c' name='checkbox' checked onChange={serviceChangeHandler} /> : <input type='checkbox' id='service_c' name='checkbox' onChange={serviceChangeHandler} />}
                        C서비스
                    </label>
                    <label>
                        {svcD ? <input type='checkbox' id='service_d' name='checkbox' checked onChange={serviceChangeHandler} /> : <input type='checkbox' id='service_d' name='checkbox' onChange={serviceChangeHandler} />}
                        D서비스
                    </label>
                    <label>
                        {svcE ? <input type='checkbox' id='service_e' name='checkbox' checked onChange={serviceChangeHandler} /> : <input type='checkbox' id='service_e' name='checkbox' onChange={serviceChangeHandler} />}
                        E서비스
                    </label>
                </div>
            </form>
            <div>유형 {user.userclass}</div>
            <div>등록일자 {user.userdate}</div>
            <div>상태 {user.userstatus}</div>
            <button type='submit' onClick={changeHandler}>
                정보 변경
            </button>
            <button type='submit' onClick={deleteHandler}>
                사용자 삭제
            </button>
        </div>
    );
};

export default UserUpdate;
