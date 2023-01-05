import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { db } from '../../../firebase';
import { collection, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const userCollection = collection(db, 'users');
    const auth = getAuth();

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

            const div = document.getElementsByClassName('natvaildpw')[0];
            if (regexp.test(userpw)) {
                div.style.display = 'none';
            }
        }
    }, [userpw]);

    // 비밀번호 확인
    useEffect(() => {
        if (pwcheck.length > 0) {
            setPwcheck((prev) => prev);

            // 이 부분 기본을 display = 'none'으로 하고 비밀번호 재확인에 focus 되면 보이게 css
            const span = document.getElementsByClassName('notsamepw')[0];
            if (userpw === pwcheck) {
                span.style.display = 'none';
            }
        }
    }, [userpw, pwcheck]);

    const signOutHandler = (e) => {
        e.preventDefault();
        setIsLoggedIn(false);
        signOut(auth)
            .then(() => {})
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    };

    const signInHandler = async (e) => {
        e.preventDefault();
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // 비동기로 데이터 가져오기
                const dataPrint = async () => {
                    const user = userCredential.user;
                    const docRef = doc(userCollection, user.uid);
                    const data = await getDoc(docRef);
                    const userInfo = data.data();

                    console.log(userInfo);
                    alert(`${userInfo.username}님, 로그인되었습니다`);
                };
                dataPrint();
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
            });
        setEmail('');
        setPassword('');
    };

    const deleteUser = async (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <form>
                <h1>로그인</h1>
                <div>
                    아이디:
                    <input
                        type='email'
                        className='signInEmail'
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </div>
                <div>
                    비밀번호:
                    <input
                        type='password'
                        className='signInPassword'
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>
                <button type='submit' className='SignInButton' onClick={clickHandler}>
                    로그인
                </button>
            </form>
            <button type='submit' className='deleteUser' onClick={deleteUser}>
                사용자 삭제
            </button>
        </div>
    );
};

export default SignIn;
