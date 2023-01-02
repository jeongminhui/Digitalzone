import React, { useState } from 'react';
import { db } from '../../../firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const SignUp = () => {
    // userid
    const [email, setEmail] = useState('');
    // userteam
    const [team, setTeam] = useState('');
    // userpw
    const [password, setPassword] = useState('');
    // username
    const [name, setName] = useState('');
    // userclass
    const [userclass, setUserclass] = useState('manager');
    // useradmin
    const [admin, setAdmin] = useState({ dashboard: true, block: true, transaction: false, node: false, service: false });
    // userservice
    const [userservice, setUserservice] = useState({ service_a: false, service_b: false, service_c: false, service_d: false, service_e: false });
    // test
    const [user, setUser] = useState('');

    const auth = getAuth();

    const checkboxes = document.getElementsByName('checkbox');

    // 권한 추가
    const adminChangeHandler = (e) => {
        setAdmin({
            ...admin,
            [e.target.id]: e.target.checked,
        });
    };

    // 서비스 권한 추가
    const serviceChangeHandler = (e) => {
        setUserservice({
            ...userservice,
            [e.target.id]: e.target.checked,
        });
    };

    // userclass 변경
    const checkedItemHandler = (e) => {
        setUserclass(e.target.value);
    };

    const clickHandler = async (e) => {
        e.preventDefault();
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential.user.metadata.creationTime);
                setEmail('');
                setTeam('');
                setPassword('');
                setName('');
                checkboxes.forEach((checkbox) => (checkbox.checked = false));

                const user = userCredential.user;
                // db에 데이터 추가
                setDoc(doc(db, 'users', user.uid), {
                    username: name,
                    userteam: team,
                    userid: user.email,
                    useradmin: {
                        ...admin,
                    },
                    userservice: {
                        ...userservice,
                    },
                    userclass: userclass,
                    // userdate: null,
                    userstatus: '정상',
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    };

    return (
        <div>
            <form>
                <h1>회원가입</h1>
                <div>
                    유형:
                    <label>
                        <input type='radio' name='type' value='manager' onClick={checkedItemHandler} defaultChecked />
                        관리자
                    </label>
                    <label>
                        <input type='radio' name='type' value='user' onClick={checkedItemHandler} />
                        사용자
                    </label>
                </div>
                <div>
                    이름:{' '}
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                </div>
                <div>
                    소속:{' '}
                    <input
                        type='text'
                        value={team}
                        onChange={(e) => {
                            setTeam(e.target.value);
                        }}
                    />
                </div>
                <div>
                    아이디:{' '}
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </div>
                <div>
                    비밀번호:{' '}
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>
                <div>
                    권한:{' '}
                    <label>
                        <input type='checkbox' checked disabled />
                        대시보드
                    </label>
                    <label>
                        <input type='checkbox' checked disabled />
                        블록
                    </label>
                    <label>
                        <input type='checkbox' id='transaction' name='checkbox' onChange={adminChangeHandler} />
                        트랜젝션
                    </label>
                    <label>
                        <input type='checkbox' id='node' name='checkbox' onChange={adminChangeHandler} />
                        노드
                    </label>
                    <label>
                        <input type='checkbox' id='service' name='checkbox' onChange={adminChangeHandler} />
                        서비스
                    </label>
                </div>
                <div>
                    이용중인 서비스:
                    <label>
                        <input type='checkbox' id='service_a' name='checkbox' onChange={serviceChangeHandler} />
                        A서비스
                    </label>
                    <label>
                        <input type='checkbox' id='service_b' name='checkbox' onChange={serviceChangeHandler} />
                        B서비스
                    </label>
                    <label>
                        <input type='checkbox' id='service_c' name='checkbox' onChange={serviceChangeHandler} />
                        C서비스
                    </label>
                    <label>
                        <input type='checkbox' id='service_d' name='checkbox' onChange={serviceChangeHandler} />
                        D서비스
                    </label>
                    <label>
                        <input type='checkbox' id='service_e' name='checkbox' onChange={serviceChangeHandler} />
                        E서비스
                    </label>
                </div>
                <button type='submit' className='SignUpButton' onClick={clickHandler}>
                    회원가입
                </button>
                <button>로그인</button>
            </form>
        </div>
    );
};

export default SignUp;
