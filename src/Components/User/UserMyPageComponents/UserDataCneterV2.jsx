import React, { useState } from 'react';
import { db } from '../../../firebase';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, deleteDoc, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import SignUpInput from './SignUpInput';
import SignInInput from './SignInInput';

const UserDataCenterV2 = () => {
    // 스테이트 저장소
    const [userclass, setUserclass] = useState('manager');
    const [admin, setAdmin] = useState({ dashboard: true, block: true, transaction: false, node: false, service: false });
    const [userservice, setUserservice] = useState({ service_a: false, service_b: false, service_c: false, service_d: false, service_e: false });
    
    // firebase 연결
    const userCollection = collection(db, 'userTest');

    // 어스
    const auth = getAuth();

    // 체크박스
    const checkboxes = document.getElementsByName('checkbox');
    
    // 블트노 권한 저장
    const adminChangeHandler = (e) => {
        setAdmin({
            ...admin,
            [e.target.id]: e.target.checked,
        });
    };
    // 서비스 권한 저장
    const serviceChangeHandler = (e) => {
        setUserservice({
            ...userservice,
            [e.target.id]: e.target.checked,
        });
    };
    // 유저 등급 저장
    const checkedItemHandler = (e) => {
        setUserclass(e.target.value);
    };
    
    // 회원가입 기능 : firebase에 전체 데이터 추가
    const clickHandler = async (userdata) => {
        console.log(userdata);
        console.log(userdata.name);
        await createUserWithEmailAndPassword(auth, userdata.email, userdata.password)
            .then((userCredential) => {
    
                checkboxes.forEach((checkbox) => (checkbox.checked = false));

                const user = userCredential.user;
                // db에 데이터 추가
                setDoc(doc(db, 'userTest', user.uid), {
                    username: userdata.name,
                    userteam: userdata.team,
                    userid: userdata.email,
                    useradmin: {
                        ...admin,
                    },
                    userservice: {
                        ...userservice,
                    },
                    userclass: userclass,
                  
                    userstatus: '정상',
                });
            })
             // 에러 확인
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    };
    
    // 로그인 기능 : firebase로부터 로그인 정보 확인
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
         <SignUpInput 
         adminChangeHandler={adminChangeHandler}
         serviceChangeHandler={serviceChangeHandler} 
         checkedItemHandler={checkedItemHandler}
         clickHandler={clickHandler} />
         <SignInInput loginClickHandler={loginClickHandler}  />
        </div>
    );
};

export default  UserDataCenterV2;
