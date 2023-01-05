import React from "react";
import { useContext } from "react";
import { UserContext } from "./UserContext";

<<<<<<< HEAD
const UserListPage = ({deleteHandler}) => {
  const { loginUser, userlist } = useContext(UserContext);
=======
const UserListPage = () => {
  const { userlist } = useContext(UserContext);

>>>>>>> parent of a777736 (feat : 리스트 테이블 구현)
  // 블트노 권한에 따른 OX 표시 함수
  const adminList = (data) => {
    if (data === true) {
      return "O";
    } else {
      return "X";
    }
  };

<<<<<<< HEAD
  // 삭제 데이터 전달
  const deleteEventHandler = (e) => {
    e.preventDefault();
    deleteHandler(e)
  }
  
  // console.log(loginUser);
  console.log(userlist);
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
          <button>사용자 추가</button>
        </div>
      </div>
      <table>
=======
  const userStatus = (data) => {
    if (data === true) {
      return "정상";
    } else {
      return "비정상";
    }
  };

  console.log(userlist);
  return (
    <div>
      {/* <table>
>>>>>>> parent of a777736 (feat : 리스트 테이블 구현)
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
        {userlist.map((user, idx) => (
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
<<<<<<< HEAD
              <td>{user.serviceCnt}</td>
              <td>{user.userdate}</td>
              <td>{user.userstatus}</td>
=======
              <td>서비스개수</td>
              <td>2</td>
              <td>{user.userdate}</td>
              <td>{userStatus(user.userstatus)}</td>
>>>>>>> parent of a777736 (feat : 리스트 테이블 구현)
              <td>
              <button type="submit" className="DeleteButton" onClick={deleteEventHandler}>
            삭제
          </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default UserListPage;
