// import React from 'react';
// import {db} from "../../../firebase"
// import {collection, deleteDoc, doc, getDocs, setDoc} from 'firebase/firestore';
// import { useEffect } from 'react';
// import { useState } from 'react';
// import { UserContext } from './UserContext';
// import UserAddPage from './UserAddPage';
// import UserListPage from './UserListPage';
// import { useNavigate, useParams } from "react-router-dom";

// const UserDataCenter = () => {
//   const userCollection = collection(db, "userData");
//   const [userList, setUserList] = useState([]);
//   const [userAdmin, setUserAdmin] = useState({})

//   const navigate = useNavigate()


//     useEffect(() => {
//       //유저 리스트 "불러오기"
//         async function getUsers() {
//           const data = await getDocs(userCollection);
//           setUserList(
//             data.docs.map((item) => ({
//               ...item.data(),                                     
//               id: item.id,
//             }))
//           );
//           // console.log(data);
//         }
//         getUsers();
//       }, []);

//       // 유저 리스트 "삭제"
//       async function deleteHandler() {
//         if (window.confirm("정말 삭제하시겠습니까?")) {
//           await deleteDoc(doc(userCollection,));
//           alert("삭제되었습니다");
//           navigate("/RtListFruits");
//         } else {
//           alert("취소되었습니다.");
//         }
//       }
      
//       //유저 리스트 "추가"
//       const addHandler = (value) => {
//         setUserAdmin(value)
//       }
//       // console.log(userAdmin);
//     return (
//         <div>
//             <UserContext.Provider value={{ userList: userList, userAdmin: userAdmin }}>
//         <UserListPage />
//       </UserContext.Provider>
//       {/* <UserAddPage addHandler={addHandler} /> */}
//         </div>
//     );
// };

// export default UserDataCenter;
