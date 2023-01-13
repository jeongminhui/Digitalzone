import React, { useState, useEffect } from 'react';
import { getAuth, updatePassword } from 'firebase/auth';
import Swal from 'sweetalert2';
import { useRecoilValue } from 'recoil';
import { loginSelector } from '../../../../Recoil/Selector';

const UserMyPage = () => {
    const loginUser = useRecoilValue(loginSelector);
    const [user, setUser] = useState({});
    // 상세정보 접근 권한
    const [admin, setAdmin] = useState({ dashboard: true, block: true, transaction: false, node: false, service: false });
    const [tran, setTran] = useState(false);
    const [node, setNode] = useState(false);
    const [serv, setServ] = useState(false);
    // 이용중인 서비스
    const [userservice, setUserservice] = useState({ service_a: false, service_b: false, service_c: false, service_d: false, service_e: false });
    const [svcA, setSvcA] = useState(false);
    const [svcB, setSvcB] = useState(false);
    const [svcC, setSvcC] = useState(false);
    const [svcD, setSvcD] = useState(false);
    const [svcE, setSvcE] = useState(false);

    // userpw
    const [userpw, setUserpw] = useState('');
    // pwcheck
    const [pwcheck, setPwcheck] = useState('');

    const auth = getAuth();
    const currentUser = auth.currentUser;

    // 로그인한 사용자 정보 가져오기
    useEffect(() => {
        setUser(loginUser);
        setAdmin(user.useradmin);
        setUserservice(user.userservice);
    }, [loginUser, user]);

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

    // 비밀번호 변경
    const pwChangeHandler = (e) => {
        e.preventDefault();
        updatePassword(currentUser, userpw)
            .then(() => {
                if (userpw !== '' && userpw === pwcheck) {
                    Swal.fire({
                        icon: 'success',
                        text: '비밀번호가 변경되었습니다',
                        showConfirmButton: false,
                        timer: 2000,
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        text: '비밀번호를 확인해 주세요',
                        showConfirmButton: false,
                        timer: 2000,
                    });
                }
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    text: '비밀번호를 확인해 주세요',
                    showConfirmButton: false,
                    timer: 2000,
                });
            });
        setUserpw('');
        setPwcheck('');
    };

    // 비밀번호 조건 검사
    useEffect(() => {
        if (userpw.length > 0) {
            setUserpw((prev) => prev);
            const regexp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/g;

            const div = document.getElementsByClassName('natvaildpwsignin')[0];
            if (regexp.test(userpw)) {
                div.style.display = 'none';
            } else if (userpw.trim() === '' || !regexp.test(userpw)) div.style.display = 'block';
        }
    }, [userpw]);

    // 비밀번호 확인
    useEffect(() => {
        if (pwcheck.length > 0) {
            setPwcheck((prev) => prev);

            // 이 부분 기본을 display = 'none'으로 하고 비밀번호 재확인에 focus 되면 보이게 css
            const same = document.getElementsByClassName('notsamepwsignin')[0];
            if (userpw === pwcheck) {
                same.style.display = 'none';
            } else same.style.display = 'block';
        }
    }, [userpw, pwcheck]);

    return (
        <>
            <div>{user.username}</div>
            <div>{user.userteam}</div>
            <form>
                <div className='signin pw'>
                    비밀번호: <input type='password' className='userpw' value={userpw} placeholder='비밀번호' onChange={(e) => setUserpw(e.target.value)} />
                </div>
                <div className='natvaildpwsignin' style={{ color: '#4665F9' }}>
                    ※ 8자리 이상 영문 대 소문자, 숫자, 특수문자를 입력하세요
                </div>
                <div className='signin pwcheck'>
                    비밀번호 재확인: <input type='password' className='userpwcheck' placeholder='비밀번호 재확인' value={pwcheck} onChange={(e) => setPwcheck(e.target.value)} />
                    <button type='submit' onClick={pwChangeHandler}>
                        변경
                    </button>
                </div>
                <div className='notsamepwsignin'> 비밀번호가 일치하지 않습니다</div>
            </form>
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
                    {tran ? <input type='checkbox' id='transaction' name='checkbox' checked disabled /> : <input type='checkbox' id='transaction' name='checkbox' disabled />}
                    트랜잭션
                </label>
                <label>
                    {node ? <input type='checkbox' id='node' name='checkbox' checked disabled /> : <input type='checkbox' id='node' name='checkbox' disabled />}
                    노드
                </label>
                <label>
                    {serv ? <input type='checkbox' id='service' name='checkbox' checked disabled /> : <input type='checkbox' id='service' name='checkbox' disabled />}
                    서비스
                </label>
            </div>
            <div>
                이용중인 서비스:
                <label>
                    {svcA ? <input type='checkbox' id='service_a' name='checkbox' checked disabled /> : <input type='checkbox' id='service_a' name='checkbox' disabled />}
                    A서비스
                </label>
                <label>
                    {svcB ? <input type='checkbox' id='service_b' name='checkbox' checked disabled /> : <input type='checkbox' id='service_b' name='checkbox' disabled />}
                    B서비스
                </label>
                <label>
                    {svcC ? <input type='checkbox' id='service_c' name='checkbox' checked disabled /> : <input type='checkbox' id='service_c' name='checkbox' disabled />}
                    C서비스
                </label>
                <label>
                    {svcD ? <input type='checkbox' id='service_d' name='checkbox' checked disabled /> : <input type='checkbox' id='service_d' name='checkbox' disabled />}
                    D서비스
                </label>
                <label>
                    {svcE ? <input type='checkbox' id='service_e' name='checkbox' checked disabled /> : <input type='checkbox' id='service_e' name='checkbox' disabled />}
                    E서비스
                </label>
            </div>
            <div>유형 {user.userclass}</div>
            <div>등록일자 {user.userdate}</div>
            <div>상태 {user.userstatus}</div>
        </>
    );
};

export default UserMyPage;
