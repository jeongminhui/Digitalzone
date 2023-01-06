import React, { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, signOut, updatePassword } from 'firebase/auth';
import { db } from '../../../firebase';
import { collection, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { useRecoilState } from 'recoil';
import { loginAtom } from '../../../Recoil/Atom';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // 로그인 true, 로그아웃 false
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // userpw
    const [userpw, setUserpw] = useState('');
    // pwcheck
    const [pwcheck, setPwcheck] = useState('');
    // recoil
    const [loginUser, setLoginUser] = useRecoilState(loginAtom);

    const userCollection = collection(db, 'users');
    const auth = getAuth();
    const currentUser = auth.currentUser;

    // 비밀번호 변경
    const pwChangeHandler = (e) => {
        e.preventDefault();
        updatePassword(currentUser, userpw)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: '비밀번호가 변경되었습니다',
                    showConfirmButton: false,
                    timer: 2000,
                });
            })
            .catch((error) => {
                console.log(error.message);
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
            const span = document.getElementsByClassName('notsamepwsignin')[0];
            if (userpw === pwcheck) {
                span.style.display = 'none';
            } else span.style.display = 'inline';
        }
    }, [userpw, pwcheck]);

    const signOutHandler = (e) => {
        e.preventDefault();
        setIsLoggedIn(false);
        signOut(auth)
            .then(() => {
                const div = document.getElementsByClassName('info')[0];
                div.style.display = 'none';
                const login1 = document.getElementsByClassName('signIn')[0];
                const login2 = document.getElementsByClassName('signIn')[1];
                login1.style.display = 'block';
                login2.style.display = 'block';
                sessionStorage.clear();
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    };

    const signInHandler = async (e) => {
        e.preventDefault();
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const dataPrint = async () => {
                    setIsLoggedIn(true);
                    const user = userCredential.user;
                    const docRef = doc(userCollection, user.uid);
                    const data = await getDoc(docRef);
                    const userInfo = data.data();

                    setLoginUser(userInfo);

                    // 로그인시 로그인창 없애기
                    const login1 = document.getElementsByClassName('signIn')[0];
                    const login2 = document.getElementsByClassName('signIn')[1];
                    login1.style.display = 'none';
                    login2.style.display = 'none';

                    // 사용자 정보 출력
                    const div = document.getElementsByClassName('info')[0];
                    div.style.display = 'block';
                    const name = document.getElementsByClassName('name')[0];
                    const team = document.getElementsByClassName('team')[0];
                    const email = document.getElementsByClassName('email')[0];

                    // 상세정보 접근권한 정보
                    const admin = document.getElementsByClassName('menu')[0];
                    const dash = document.getElementsByClassName('dash')[0];
                    const block = document.getElementsByClassName('block')[0];
                    const tran = document.getElementsByClassName('tran')[0];
                    const node = document.getElementsByClassName('node')[0];
                    const serv = document.getElementsByClassName('serv')[0];

                    // 이용중인 서비스 정보
                    const svc = document.getElementsByClassName('menu')[1];
                    const A = document.getElementsByClassName('A')[0];
                    const B = document.getElementsByClassName('B')[0];
                    const C = document.getElementsByClassName('C')[0];
                    const D = document.getElementsByClassName('D')[0];
                    const E = document.getElementsByClassName('E')[0];

                    const type = document.getElementsByClassName('type')[0];
                    const date = document.getElementsByClassName('date')[0];
                    const status = document.getElementsByClassName('status')[0];

                    name.innerHTML = `이름 <span className='username'>${userInfo.username}</span>`;
                    team.innerHTML = `소속 <span className='userteam'>${userInfo.userteam}</span>`;
                    email.innerHTML = `이메일(아이디) <span className='userid'>${userInfo.userid}</span>`;

                    admin.innerHTML = `상세정보 접근 권한`;
                    if (userInfo.userclass === '사용자') {
                        // 사용자일 때 checkbox disabled
                        if (userInfo.useradmin.dashboard) dash.innerHTML = `<label><input type='checkbox' disabled checked /> 대시보드</label>`;
                        else dash.innerHTML = `<label><input type='checkbox' disabled /> 대시보드</label>`;
                        if (userInfo.useradmin.block) block.innerHTML = `<label><input type='checkbox' disabled checked /> 블록</label>`;
                        else block.innerHTML = `<label><input type='checkbox' disabled /> 블록</label>`;
                        if (userInfo.useradmin.transaction) tran.innerHTML = `<label><input type='checkbox' disabled checked /> 트랜잭션</label>`;
                        else tran.innerHTML = `<label><input type='checkbox' disabled /> 트랜잭션</label>`;
                        if (userInfo.useradmin.node) node.innerHTML = `<label><input type='checkbox' disabled checked /> 노드</label>`;
                        else node.innerHTML = `<label><input type='checkbox' disabled /> 노드</label>`;
                        if (userInfo.useradmin.service) serv.innerHTML = `<label><input type='checkbox' disabled checked /> 서비스</label>`;
                        else serv.innerHTML = `<label><input type='checkbox' disabled /> 서비스</label>`;
                    } else {
                        if (userInfo.useradmin.dashboard) dash.innerHTML = `<label><input type='checkbox' disabled checked /> 대시보드</label>`;
                        else dash.innerHTML = `<label><input type='checkbox' disabled /> 대시보드</label>`;
                        if (userInfo.useradmin.block) block.innerHTML = `<label><input type='checkbox' disabled checked /> 블록</label>`;
                        else block.innerHTML = `<label><input type='checkbox' disabled /> 블록</label>`;
                        if (userInfo.useradmin.transaction) tran.innerHTML = `<label><input type='checkbox' checked /> 트랜잭션</label>`;
                        else tran.innerHTML = `<label><input type='checkbox' /> 트랜잭션</label>`;
                        if (userInfo.useradmin.node) node.innerHTML = `<label><input type='checkbox' checked /> 노드</label>`;
                        else node.innerHTML = `<label><input type='checkbox' /> 노드</label>`;
                        if (userInfo.useradmin.service) serv.innerHTML = `<label><input type='checkbox' checked /> 서비스</label>`;
                        else serv.innerHTML = `<label><input type='checkbox' /> 서비스</label>`;
                    }

                    svc.innerHTML = `이용중인 서비스`;
                    if (userInfo.userclass === '사용자') {
                        if (userInfo.userservice.service_a) A.innerHTML = `<label><input type='checkbox' disabled checked /> A서비스</label>`;
                        else A.innerHTML = `<label><input type='checkbox' disabled /> A서비스</label>`;
                        if (userInfo.userservice.service_b) B.innerHTML = `<label><input type='checkbox' disabled checked /> B서비스</label>`;
                        else B.innerHTML = `<label><input type='checkbox' disabled /> B서비스</label>`;
                        if (userInfo.userservice.service_c) C.innerHTML = `<label><input type='checkbox' disabled checked /> C서비스</label>`;
                        else C.innerHTML = `<label><input type='checkbox' disabled /> C서비스</label>`;
                        if (userInfo.userservice.service_d) D.innerHTML = `<label><input type='checkbox' disabled checked /> D서비스</label>`;
                        else D.innerHTML = `<label><input type='checkbox' disabled /> D서비스</label>`;
                        if (userInfo.userservice.service_e) E.innerHTML = `<label><input type='checkbox' disabled checked /> E서비스</label>`;
                        else E.innerHTML = `<label><input type='checkbox' disabled /> E서비스</label>`;
                    } else {
                        if (userInfo.userservice.service_a) A.innerHTML = `<label><input type='checkbox' checked /> A서비스</label>`;
                        else A.innerHTML = `<label><input type='checkbox' /> A서비스</label>`;
                        if (userInfo.userservice.service_b) B.innerHTML = `<label><input type='checkbox' checked /> B서비스</label>`;
                        else B.innerHTML = `<label><input type='checkbox' /> B서비스</label>`;
                        if (userInfo.userservice.service_c) C.innerHTML = `<label><input type='checkbox' checked /> C서비스</label>`;
                        else C.innerHTML = `<label><input type='checkbox' /> C서비스</label>`;
                        if (userInfo.userservice.service_d) D.innerHTML = `<label><input type='checkbox' checked /> D서비스</label>`;
                        else D.innerHTML = `<label><input type='checkbox' /> D서비스</label>`;
                        if (userInfo.userservice.service_e) E.innerHTML = `<label><input type='checkbox' checked /> E서비스</label>`;
                        else E.innerHTML = `<label><input type='checkbox' /> E서비스</label>`;
                    }

                    type.innerHTML = `유형 <span className='userclass'>${userInfo.userclass}</span>`;
                    date.innerHTML = `등록일자 <span className='userdate'>${userInfo.userdate}</span>`;
                    status.innerHTML = `상태 <span className='userstatus'>${userInfo.userstatus}</span>`;
                };
                dataPrint();
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
            });
        setEmail('');
        setPassword('');
    };

    return (
        <div>
            <form>
                <h1>로그인</h1>
                <div className='signIn Email'>
                    아이디:
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </div>
                <div className='signIn Password'>
                    비밀번호:
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>
                <div className='info' style={{ display: 'none' }}>
                    <div className='signin name'></div>
                    <div className='signin team'></div>
                    <div className='signin email'></div>
                    <form>
                        <div className='signin pw'>
                            비밀번호: <input type='password' className='userpw' value={userpw} onChange={(e) => setUserpw(e.target.value)} />
                        </div>
                        <div className='signin pwcheck'>
                            비밀번호 재확인: <input type='password' className='userpwcheck' value={pwcheck} onChange={(e) => setPwcheck(e.target.value)} />
                            <button type='submit' onClick={pwChangeHandler}>
                                변경
                            </button>
                            <span className='notsamepwsignin'> 비밀번호가 일치하지 않습니다</span>
                        </div>
                        <div className='natvaildpwsignin' style={{ color: '#4665F9' }}>
                            ※ 8자리 이상 영문 대 소문자, 숫자, 특수문자를 입력하세요
                        </div>
                    </form>
                    <div className='signin admin'>
                        <span className='menu admin'></span>
                        <span className='dash'></span>
                        <span className='block'></span>
                        <span className='tran'></span>
                        <span className='node'></span>
                        <span className='serv'></span>
                    </div>
                    <div className='signin svc'>
                        <span className='menu svc'></span>
                        <span className='A'></span>
                        <span className='B'></span>
                        <span className='C'></span>
                        <span className='D'></span>
                        <span className='E'></span>
                    </div>
                    <div className='signin type'></div>
                    <div className='signin date'></div>
                    <div className='signin status'></div>
                </div>

                {isLoggedIn ? (
                    <button onClick={signOutHandler}>로그아웃</button>
                ) : (
                    <button type='submit' className='SignInButton' onClick={signInHandler}>
                        로그인
                    </button>
                )}
            </form>
        </div>
    );
};

export default SignIn;
