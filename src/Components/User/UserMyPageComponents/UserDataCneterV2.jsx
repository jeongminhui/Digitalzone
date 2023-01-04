import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, deleteDoc, doc, setDoc, getDoc, updateDoc, getDocs } from 'firebase/firestore';
import SignUpInput from './SignUpInput';
import SignInInput from './SignInInput';
import { UserContext } from './UserContext';
import UserListPage from './UserListPage';

const UserDataCenterV2 = () => {
    // 스테이트 저장소
    const [userclass, setUserclass] = useState('manager');
    const [admin, setAdmin] = useState({ dashboard: true, block: true, transaction: false, node: false, service: false });
    const [userservice, setUserservice] = useState({ service_a: false, service_b: false, service_c: false, service_d: false, service_e: false });
    const [serviceCnt, setServiceCnt] = useState(0)
    const [loginUser, setLoginUser] = useState({})
    const [userlist,setUserlist] = useState([])

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
        if (e.target.checked === true) setServiceCnt((prev) => prev + 1);
        else setServiceCnt((prev) => prev - 1);
    };

    console.log(serviceCnt);
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
                    serviceCnt: serviceCnt,
                    userclass: userclass,                  
                    userstatus: '정상',
                });
                setServiceCnt(0)
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
                // 비동기로 로그인 데이터 가져오기
                const dataPrint = async () => {
                    const user = userCredential.user;
                    const docRef = doc(userCollection, user.uid);
                    const data = await getDoc(docRef);
                    const userInfo = data.data();
                    
                    // 로그인 유저 정보 저장
                    setLoginUser(userInfo)
                               
                    alert(`${userInfo.username}님, 로그인되었습니다`);
                };
                dataPrint();
            })
            // 에러 확인
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    };

    // 유저 리스트 불러오기 : firebase로부터 유저 전체 리스트 불러오기
    useEffect(() => {
        console.log('확인');
                async function getUsers() {
                  const data = await getDocs(userCollection);
                  setUserlist(
                    data.docs.map((item) => ({
                      ...item.data(),                                     
                    }))
                  );
                }
                getUsers();
              },[]);
console.log('에러확인중');
    console.log(loginUser);          
    console.log(userlist);
        return (
        <div>
         <SignUpInput 
         adminChangeHandler={adminChangeHandler}
         serviceChangeHandler={serviceChangeHandler} 
         checkedItemHandler={checkedItemHandler}
         clickHandler={clickHandler} />
         <SignInInput loginClickHandler={loginClickHandler}  />
         <UserContext.Provider value={{ loginUser: loginUser, userlist: userlist }}>
        <UserListPage />
      </UserContext.Provider>
        </div>
    );
};

export default  UserDataCenterV2;
