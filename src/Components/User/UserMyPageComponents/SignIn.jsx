import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { db } from '../../../firebase';
import { collection, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import SignInIput from './SignInInput';
import SignInInput from './SignInInput';

const SignIn = () => {
    
    const userCollection = collection(db, 'userTest');
    const auth = getAuth();

    const loginClickHandler = async (e) => {
        await signInWithEmailAndPassword(auth, e.email, e.password)
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
    };


    return (
        <div>
       <SignInInput loginClickHandler={loginClickHandler}  />
        </div>
    );
};

export default SignIn;
