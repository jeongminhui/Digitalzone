import React, { useState } from 'react';
import { db } from '../../../firebase';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, deleteDoc, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import SignUpInput from './SignUpInput';

const SignUp = () => {
    // 스테이트 저장소
    const [userclass, setUserclass] = useState('manager');
    const [admin, setAdmin] = useState({ dashboard: true, block: true, transaction: false, node: false, service: false });
    const [userservice, setUserservice] = useState({ service_a: false, service_b: false, service_c: false, service_d: false, service_e: false });
    
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
    
    // 클릭 시 firebase에 전체 데이터 추가
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
    

    return (
        <div>
         <SignUpInput 
         adminChangeHandler={adminChangeHandler}
         serviceChangeHandler={serviceChangeHandler} 
         checkedItemHandler={checkedItemHandler}
         clickHandler={clickHandler} />
        </div>
    );
};

export default SignUp;
