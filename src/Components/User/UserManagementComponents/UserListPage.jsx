import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "./UserContext";

const UserListPage = () => {
  const { userList } = useContext(UserContext);

  // 블트노 권한에 따른 OX 표시 함수
  const userAdmin = (data) => {
    if (data === true) {
      return "O";
    } else {
      return "X";
    }
  };
  // 서비스 이용 개수 계산 함수
  //   const userService = (obj) => {
  //     const serviceArr = [obj]
  //     console.log(serviceArr);
  //   }

  const userStatus = (data) => {
    if (data === true) {
      return "정상";
    } else {
      return "비정상";
    }
  };

  return (
    <div>
      <div className="UserTopContainer">
        <div className="UserTopContainer_left">
          <h1>사용자 정보</h1>
          <h3>
            <span>
              <b>|</b>
            </span>
            전체 사용자
          </h3>
        </div>
        <div className="UserTopContainer_right">
          {/* 여기 추후 modal 컴포넌트로 모달오픈 props 보낼 것임. 안되면 어쩔 수 없이 이 컴포넌트가 지저분... 그 전까지 난 props 공부..*/}
          <button>사용자 추가</button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>유형</th>
            <th>이름</th>
            <th>소속</th>
            <th>이메일(아이디)</th>
            <th>대시보드</th>
            <th>블록</th>
            <th>트랜잭션</th>
            <th>노드</th>
            <th>서비스</th>
            <th>이용중인 서비스</th>
            <th>등록일자</th>
            <th>상태</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user, idx) => (
            <tr key={idx}>
              <td>{user.id}</td>
              <td>{user.userclass}</td>
              <td>{user.username}</td>
              <td>{user.userteam}</td>
              <td>{user.userid}</td>
              <td>{userAdmin(user.useradmin.dashboard)}</td>
              <td>{userAdmin(user.useradmin.block)}</td>
              <td>{userAdmin(user.useradmin.transaction)}</td>
              <td>{userAdmin(user.useradmin.node)}</td>
              <td>{userAdmin(user.useradmin.service)}</td>
              {/* <td>{userService(user.userservice.service)}</td> */}
              <td>2</td>
              <td>{user.userdate}</td>
              <td>{userStatus(user.userstatus)}</td>
              <td>
                <button>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserListPage;
