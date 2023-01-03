import React, { useState } from 'react';
import { db } from '../../../firebase';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, deleteDoc, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import SignUpInput from './SignUpInput';

const SignUp = () => {
    // useclass
    const [userclass, setUserclass] = useState('manager');
    // useradmin
    const [admin, setAdmin] = useState({ dashboard: true, block: true, transaction: false, node: false, service: false });
    // userservice
    const [userservice, setUserservice] = useState({ service_a: false, service_b: false, service_c: false, service_d: false, service_e: false });

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
    
    // firebase 데이터 추가
    const clickHandler = async (userdata) => {
        console.log(userdata);
        console.log(userdata.name);
        // e.preventDefault();
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
         <SignUpInput 
         adminChangeHandler={adminChangeHandler}
         serviceChangeHandler={serviceChangeHandler} 
         checkedItemHandler={checkedItemHandler}
         clickHandler={clickHandler} />
        </div>
    );
};

export default SignUp;
