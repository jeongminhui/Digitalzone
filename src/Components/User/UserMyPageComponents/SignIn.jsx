import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../../../firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userCollection = collection(db, "users");
  const auth = getAuth();

  const clickHandler = async (e) => {
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
    setEmail("");
    setPassword("");
  };

  const deleteUser = async (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form>
        {/* <h1>로그인</h1> */}
        <div>
          {/* 아이디: */}
          <input
            type="email"
            className="signInEmail"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          {/* 비밀번호: */}
          <input
            type="password"
            className="signInPassword"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button type="submit" className="SignInButton" onClick={clickHandler}>
          로그인
        </button>
      </form>
      {/* <button type="submit" className="deleteUser" onClick={deleteUser}>
        사용자 삭제
      </button> */}
    </div>
  );
};

export default SignIn;
