import React, { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { db } from '../../../../firebase';
import { collection, doc, getDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { useRecoilState } from 'recoil';
import { loginAtom } from '../../../../Recoil/Atom';

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // 로그인 실패 메시지
    const [errorMsg, setErrorMsg] = useState('');
    // recoil
    const [loginUser, setLoginUser] = useRecoilState(loginAtom);

    const userCollection = collection(db, 'users');
    const auth = getAuth();

    const signInHandler = async (e) => {
        e.preventDefault();
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const dataPrint = async () => {
                    const user = userCredential.user;
                    const docRef = doc(userCollection, user.uid);
                    const data = await getDoc(docRef);
                    const userInfo = data.data();

                    setLoginUser(userInfo);
                };
                dataPrint();
            })
            .catch((error) => {
                console.log(error.code)
                switch (error.code) {
                    case 'auth/user-not-found':
                        setErrorMsg('해당 사용자가 없습니다');
                        break;
                    case 'auth/wrong-password':
                        setErrorMsg('비밀번호가 일치하지 않습니다');
                        break;
                    case 'auth/invalid-email':
                        setErrorMsg('이메일 형식이 아닙니다');
                        break;
                    case 'auth/too-many-requests':
                        setErrorMsg('너무 많이 시도했습니다');
                        break;
                    case 'auth/internal-error':
                        setErrorMsg('예기치 못한 오류가 생겼습니다');
                        break;
                    default:
                        setErrorMsg('로그인에 실패하였습니다');
                }
            });
        setEmail('');
        setPassword('');
    };
    useEffect(() => {
        if (errorMsg !== '') {
            const errorPrint = async () => {
                await Swal.fire({
                    icon: 'error',
                    title: errorMsg,
                    showConfirmButton: false,
                    timer: 2000,
                });
            };
            errorPrint();
            setErrorMsg('');
        } else return;
    }, [errorMsg]);

    return (
        <>
            <form>
                <div className='signIn Email'>
                    <input
                        type='email'
                        value={email}
                        placeholder='아이디(이메일)'
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </div>
                <div className='signIn Password'>
                    <input
                        type='password'
                        value={password}
                        placeholder='비밀번호'
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>
                <button type='submit' className='SignInButton' onClick={signInHandler}>
                    로그인
                </button>
            </form>
        </>
    );
};

export default UserLogin;
