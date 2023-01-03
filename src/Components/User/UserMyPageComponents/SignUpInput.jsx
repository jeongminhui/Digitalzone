import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, deleteDoc, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

const SignUpInput = ({adminChangeHandler},{serviceChangeHandler},{checkedItemHandler},{clickHandler}) => {
     // userid
     const [email, setEmail] = useState('');
     // userteam
     const [team, setTeam] = useState('');
     // userpw
     const [password, setPassword] = useState('');
     // username
     const [name, setName] = useState('');
     
     // useradmin
     const [admin, setAdmin] = useState({ dashboard: true, block: true, transaction: false, node: false, service: false });
     // userservice
     const [userservice, setUserservice] = useState({ service_a: false, service_b: false, service_c: false, service_d: false, service_e: false });
     // test
     const [user, setUser] = useState('');

    // userclass
    const [userclass, setUserclass] = useState('');

     const classHandler = (e) => {
        setUserclass(e.target.value)}
      

   useEffect(()=>{
    checkedItemHandler(userclass)
},[userclass])
    
console.log(userclass);



    return (
        <div>
        <form>
          <h1>사용자 추가</h1>
          <div>
            유형:
            <label>
              <input
                type="radio"
                name="type"
                value="manager"
                onClick={classHandler}
                defaultChecked
              />
              관리자
            </label>
            <label>
              <input
                type="radio"
                name="type"
                value="user"
                onClick={classHandler}
              />
              사용자
            </label>
          </div>
          <div>
            이름:{" "}
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div>
            소속:{" "}
            <input
              type="text"
              value={team}
              onChange={(e) => {
                setTeam(e.target.value);
              }}
            />
          </div>
          <div>
            아이디:{" "}
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            비밀번호:{" "}
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div>
            권한:{" "}
            <label>
              <input type="checkbox" checked disabled />
              대시보드
            </label>
            <label>
              <input type="checkbox" checked disabled />
              블록
            </label>
            <label>
              <input
                type="checkbox"
                id="transaction"
                name="checkbox"
                onChange={adminChangeHandler}
              />
              트랜젝션
            </label>
            <label>
              <input
                type="checkbox"
                id="node"
                name="checkbox"
                onChange={adminChangeHandler}
              />
              노드
            </label>
            <label>
              <input
                type="checkbox"
                id="service"
                name="checkbox"
                onChange={adminChangeHandler}
              />
              서비스
            </label>
          </div>
          <div>
            이용중인 서비스:
            <label>
              <input
                type="checkbox"
                id="service_a"
                name="checkbox"
                onChange={serviceChangeHandler}
              />
              A서비스
            </label>
            <label>
              <input
                type="checkbox"
                id="service_b"
                name="checkbox"
                onChange={serviceChangeHandler}
              />
              B서비스
            </label>
            <label>
              <input
                type="checkbox"
                id="service_c"
                name="checkbox"
                onChange={serviceChangeHandler}
              />
              C서비스
            </label>
            <label>
              <input
                type="checkbox"
                id="service_d"
                name="checkbox"
                onChange={serviceChangeHandler}
              />
              D서비스
            </label>
            <label>
              <input
                type="checkbox"
                id="service_e"
                name="checkbox"
                onChange={serviceChangeHandler}
              />
              E서비스
            </label>
          </div>
          <button type="submit" className="SignUpButton" onClick={clickHandler}>
            추가
          </button>
        </form>
      </div>
    );
  };

export default SignUpInput;