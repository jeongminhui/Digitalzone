import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "./UserContext";

const UserListPage = () => {
  const { userList,userAdmin } = useContext(UserContext);

  // 블트노 권한에 따른 OX 표시 함수
  const adminList = (data) => {
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
// console.log(userAdmin);
  return (
    <div>
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
              <td>{adminList(user.useradmin.dashboard)}</td>
              <td>{adminList(user.useradmin.block)}</td>
              <td>{adminList(user.useradmin.transaction)}</td>
              <td>{adminList(user.useradmin.node)}</td>
              <td>{adminList(user.useradmin.service)}</td>
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
