import React, { useEffect, useReducer, useState } from 'react';
import { db } from '../../../firebase';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, deleteUser } from 'firebase/auth';
import { collection, deleteDoc, doc, setDoc, getDoc, updateDoc, getDocs } from 'firebase/firestore';
import SignUpInput from './SignUpInput';
import SignInInput from './SignInInput';
import { UserContext } from './UserContext';
import UserListPage from './UserListPage';
import UserInfo from './UserInfo';
import { useRecoilState, useSetRecoilState, useResetRecoilState } from 'recoil';
import { atom } from 'recoil';
import { loginSelector } from '../../../recoil/loginSelector';
import { loginState } from '../../../recoil/loginState';


const UserDataCenterV2 = () => {
    // 스테이트 저장소
    const [userclass, setUserclass] = useState('관리자');
    const [admin, setAdmin] = useState({ dashboard: true, block: true, transaction: false, node: false, service: false });
    const [userservice, setUserservice] = useState({ service_a: false, service_b: false, service_c: false, service_d: false, service_e: false });
    const [serviceCnt, setServiceCnt] = useState(0);
    const [loginUser, setLoginUser] = useRecoilState(loginState)
    const [userlist,setUserlist] = useState([])
   console.log(loginUser);
  
    // firebase 연결
    const userCollection = collection(db, 'users');

    // 어스
    const auth = getAuth();
    const user = auth.currentUser;


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
        // 서비스 개수 카운트
        if(e.target.checked === true){
            setServiceCnt(serviceCnt+1)
        }else{
            setServiceCnt(serviceCnt-1)
        }
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
                
                // timestamp yyyy-MM-dd
                const time = new Date(user.metadata.creationTime);
                const date = new Date(time.getTime() - time.getTimezoneOffset() * 60000).toISOString().split('T')[0];

                // db에 데이터 추가
                setDoc(doc(db, 'users', user.uid), {
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
                    serviceCnt: serviceCnt,
                    userstatus: '정상',
                    userdate: date,
                    uid : user.uid,
                });

                 // 서비스 개수 초기화
                 setServiceCnt(0)
                 // 랜더링
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
                    
                    setLoginUser(user.uid)
                               
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

    // 로그아웃 기능
    // const signOutHandler = (e) => {
    //     e.preventDefault();
    //     setIsLoggedIn(false);
    //     signOut(auth)
    //         .then(() => {

    //         })
    //         .catch((error) => {
    //             const errorMessage = error.message;
    //             console.log(errorMessage);
    //         });
    // };

    // 사용자 삭제 기능
    const deleteHandler = async (e) =>{
        if (window.confirm("정말 삭제하시겠습니까?")) {
            deleteDoc(doc(userCollection,e));
            alert("삭제되었습니다");
            window.location.reload();
            // navigate("/RtListFruits");
          } else {
            alert("취소되었습니다.");
          }
          
          console.log(e);
        }

    // 유저 리스트 불러오기 : firebase로부터 유저 전체 리스트 불러오기
    useEffect(() => {
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
    
    
  

    console.log(loginUser);
    console.log(userlist);
    return (
        <div>
         <SignUpInput 
         adminChangeHandler={adminChangeHandler}
         serviceChangeHandler={serviceChangeHandler} 
         checkedItemHandler={checkedItemHandler}
         clickHandler={clickHandler}
         deleteHander={deleteHandler} />
         <SignInInput loginClickHandler={loginClickHandler}  />
         <UserContext.Provider value={{ loginUser: loginUser, userlist: userlist }} >
        <UserListPage deleteHandler={deleteHandler} />
        
      </UserContext.Provider>
        </div>
    );
};

export default UserDataCenterV2;
