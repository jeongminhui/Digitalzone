import { getAuth } from 'firebase/auth';
import { collection, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from "react";
import { db } from '../../../firebase';
import Modal from "react-modal";
import { async } from '@firebase/util';

const UserListPage = () => {
    // 스테이트 저장소
    const [userlist, setUserlist] = useState([])
    const [modalUser, setModalUser] = useState({})
    const [modalIsOpen, setIsOpen] = React.useState(false);


    // firebase 연결
    const userCollection = collection(db, 'users');

    // 어스
    const auth = getAuth();
    const user = auth.currentUser;


    // 모달창 스타일
    const customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        // textAlign: "Center",
          padding: "50px",
      },
    };
    
    // 모달창 열기
    function openModal(uid) {
      setIsOpen(true);
      getModalUser(uid)
      console.log(uid);
      }
    
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = "#f00";
      }
    
    
    function closeModal() {
      setIsOpen(false);
    }

    
  // 전체 유저 데이터 가져오기
  useEffect(()=>{
    async function getUsers() {
        const data = await getDocs(userCollection);
        setUserlist(
          data.docs.map((item) => ({
            ...item.data(),                                     
          }))
        );
      };
     getUsers() 
  },[])

  // 특정 유저 데이터 가져오기
  const getModalUser = async(uid) => {
      const docRef = doc(userCollection, uid);
      const modalData = await getDoc(docRef);
      const modalUserData = modalData.data()
      setModalUser(modalUserData)
  }

  // 특정 유저 데이터 삭제하기
  const deleteHandler = async (uid,e) => {
    // e.preventDefault();
    if (window.confirm("정말 삭제하시겠습니까?")) {
        await deleteDoc(doc(userCollection,uid));
        alert("삭제되었습니다");
        window.location.reload();
        // navigate("/RtListFruits");
      } else {
        alert("취소되었습니다.");
      }
    }

 
  // 블트노 권한에 따른 OX 표시 함수
  const adminList = (data) => {
    if (data === true) {
      return "O";
    } else {
       return "X";
    }
  }

  console.log(modalUser);
  console.log(userlist);
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
        {userlist.map((user, idx) => (
            <tr key={idx} onClick={(e)=>openModal(user.uid,e)}>
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
              <td onClick={e => e.stopPropagation()}>
              <button type="submit"  className="DeleteButton" onClick={(e)=>deleteHandler(user.uid,e)}>
            삭제
          </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
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
            <tr>
              <td>{modalUser.uid}</td>
              <td>{modalUser.username}</td>
              <td>{modalUser.userteam}</td>
              <td>{modalUser.userid}</td>
              {/* <td>{adminList(userlist.useradmin.dashboard)}</td>
              <td>{adminList(userlist.useradmin.block)}</td>
              <td>{adminList(userlist.useradmin.transaction)}</td>
              <td>{adminList(userlist.useradmin.node)}</td>
              <td>{adminList(userlist.useradmin.service)}</td>
              <td>{userlist.serviceCnt}</td>
              <td>{userlist.userdate}</td>
              <td>{userlist.userstatus}</td> */}
              </tr>
        </tbody>
      </table>
      </Modal>
    </div>
  );
};

export default UserListPage;
