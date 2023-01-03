import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { db } from '../../../firebase';
import { collection, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import SignInIput from './SignInInput';
import SignInInput from './SignInInput';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const userCollection = collection(db, 'userTest');
    const auth = getAuth();

    const loginClickHandler = async (e) => {
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
       <SignInInput loginClickHandler={loginClickHandler}  />
        </div>
    );
};

export default SignIn;
