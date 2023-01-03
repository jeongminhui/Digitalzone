import React, { useState } from 'react';
import { db } from '../../../firebase';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, deleteDoc, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import SignUpInput from './SignUpInput';

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

    const [userdata, setUserData] = useState({})

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

    const userdataHandler = (e) => {
        setUserData(e)
    }

    

    return (
        <div>
         <SignUpInput 
         adminChangeHandler={adminChangeHandler}
         serviceChangeHandler={serviceChangeHandler} 
         checkedItemHandler={checkedItemHandler}
         clickHandler={clickHandler}
         userdataHandler={userdataHandler} />
        </div>
    );
};

export default SignUp;
