import React from "react";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import UserInsertModal from "../UserInsertComponents/UserInsertModal";

const UserListPage = ({deleteHandler}) => {
  const { loginUser, userlist } = useContext(UserContext);
  // 블트노 권한에 따른 OX 표시 함수
  const adminList = (data) => {
    if (data === true) {
      return "O";
    } else {
      return "X";
    }
  };

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
          {/* 여기 추후 modal 컴포넌트로 모달오픈 props 보낼 것임. 안되면 어쩔 수 없이 이 컴포넌트가 지저분... 그 전까지 난 props 공부..*/}
          <UserInsertModal />
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
         {userlist.map((user, idx) => (
            <tr key={idx}>
             <td>{idx+1}</td>
              <td>{user.userclass}</td>
              <td>{user.username}</td>
              <td>{user.userteam}</td>
              <td>{user.userid}</td>
             <td>{adminList(user.useradmin.dashboard)}</td>
              <td>{adminList(user.useradmin.block)}</td>
              <td>{adminList(user.useradmin.transaction)}</td>
              <td>{adminList(user.useradmin.node)}</td>
              <td>{adminList(user.useradmin.service)}</td>
              <td>{user.serviceCnt}</td>
              <td>{user.userdate}</td>
              <td>{user.userstatus}</td>
              <td>
              <button type="submit" className="DeleteButton" onClick={deleteEventHandler}>
            삭제
          </button>
              </td>
            </tr>
   ))}

        </tbody>
      </table>
    </div>
  );
};

export default UserListPage;
