import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

const UserAddPage = () => {
  const [userData, setUserData] = useState({});
  const [userClass, setUserClass] = useState("manager");

  // 유형

  const classHandler = (e) => {
    if (e.target.value === "manager") {
      setUserClass(e.target.value);
    } else {
      setUserClass(e.target.value);
    }
  };

  console.log(userClass);
  return (
    <div>
      <h1>사용자 추가</h1>

      <p>유형</p>
      <input
        type="radio"
        name="name"
        value="manager"
        id="manager"
        onClick={classHandler}
        checked
      />
      {/* label for, id 안주고 그냥 감싸만 줘도 되는데, 이렇게 한 이유가 있는거겠죠? 😯*/}
      <label for="manager">Manager</label>
      <input
        type="radio"
        name="name"
        value="user"
        id="user"
        onClick={classHandler}
      />
      <label for="user">User</label>

      <p>이름</p>
      <input type="text" />
      <p>소속</p>
      <input type="text" />

      <p>이메일(아이디)</p>
      <input type="text" />
      <span>@</span>
      <select>
        <option value="naver">naver.com</option>
        <option value="google">gmail.com</option>
      </select>

      <p>비밀번호</p>
      <input type="text" />

      <p>비밀번호 재확인</p>
      <input type="text" />

      <p>상세정보 접근 권한</p>
      <input type="checkbox" id="dashboard" name="dashboard" checked disabled />
      <label for="dashboard">대시보드</label>
      <input type="checkbox" id="block" name="block" checked disabled />
      <label for="block">블록</label>
      <input type="checkbox" id="transaction" name="transaction" />
      <label for="transaction">트랜잭션</label>
      <input type="checkbox" id="node" name="node" />
      <label for="node">노드</label>
      <input type="checkbox" id="service" name="service" />
      <label for="service">서비스</label>

      <p>이용중인 서비스</p>
      <input type="checkbox" id="service_a" />
      <label for="service_a">A서비스</label>
      <input type="checkbox" id="service_b" />
      <label for="service_b">B서비스</label>
      <input type="checkbox" id="service_c" />
      <label for="service_c">C서비스</label>
      <input type="checkbox" id="service_d" />
      <label for="service_d">D서비스</label>
      <input type="checkbox" id="service_e" />
      <label for="service_e">E서비스</label>

      <button>추가</button>
    </div>
  );
};

export default UserAddPage;
