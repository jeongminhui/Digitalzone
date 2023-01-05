import React, { useEffect, useState } from 'react';

const SignUpInput = ({adminChangeHandler,serviceChangeHandler,checkedItemHandler,clickHandler}) => {
  
    // 유저 데이터 스테이트
    const [userdata, setUserdata] = useState({})
    
    // 유저 등급 전달
    const classHandler = (e) => {
      checkedItemHandler(e)}
    // 블트노 권한 전달
    const adminHandler = (e) => {
      adminChangeHandler(e)}
    
    // 서비스 권한 전달np
    const serviceHandler = (e) => {
      serviceChangeHandler(e)
    
    }

    // 클릭 + 유저 데이터 전달
    const changeHandler = (e) => {
      e.preventDefault();
        const nextUserdata = {
          ...userdata,
          [e.target.name]: e.target.value
        }
        setUserdata(nextUserdata);
      };
    const clickEventHandler = (e) => {
      e.preventDefault();
        clickHandler(userdata)
    }

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
              name='name'
              onChange={changeHandler}
            />
          </div>
          <div>
            소속:{" "}
            <input
              type="text"
              name='team'
              onChange={changeHandler}
            />
          </div>
          <div>
            아이디:{" "}
            <input
              type="email"
              name='email'
              onChange={changeHandler}
            />
          </div>
          <div>
            비밀번호:{" "}
            <input
              type="password"
              name='password'
              onChange={changeHandler}
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
                onChange={adminHandler}
              />
              트랜젝션
            </label>
            <label>
              <input
                type="checkbox"
                id="node"
                name="checkbox"
                onChange={adminHandler}
              />
              노드
            </label>
            <label>
              <input
                type="checkbox"
                id="service"
                name="checkbox"
                onChange={adminHandler}
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
                onChange={serviceHandler}
              />
              A서비스
            </label>
            <label>
              <input
                type="checkbox"
                id="service_b"
                name="checkbox"
                onChange={serviceHandler}
              />
              B서비스
            </label>
            <label>
              <input
                type="checkbox"
                id="service_c"
                name="checkbox"
                onChange={serviceHandler}
              />
              C서비스
            </label>
            <label>
              <input
                type="checkbox"
                id="service_d"
                name="checkbox"
                onChange={serviceHandler}
              />
              D서비스
            </label>
            <label>
              <input
                type="checkbox"
                id="service_e"
                name="checkbox"
                onChange={serviceHandler}
              />
              E서비스
            </label>
          </div>
          <button type="submit" className="SignUpButton" onClick={clickEventHandler}>
            추가
          </button>
         
        </form>
      </div>
    );
  };

export default SignUpInput;