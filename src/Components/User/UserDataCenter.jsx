import React from 'react';
import {db} from "../../firebase"
import {collection, getDocs, setDoc} from 'firebase/firestore';
import { useEffect } from 'react';
import { useState } from 'react';
import UserListPage from './UserListPage';
import { UserContext } from './UserContext';
import UserAddPage from './UserAddPage';

const UserDataCenter = () => {
    const userCollection = collection(db,"users")
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        async function getUsers() {
          const data = await getDocs(userCollection);
          setUserList(
            data.docs.map((item) => ({
              ...item.data(),                                     
              id: item.id,
            }))
          );
          console.log(data);
        }
        getUsers();
      }, []);
    console.log(userList.id);
    // useEffect(() => {
    //   async function clickHandler() {
    //     await setDoc(doc(userCollection, ), {
    //       randomID: insertList.randomID,
    //       name: insertList.name,
    //       season: insertList.season,
    //       color: insertList.color,
    //       amount: insertList.amount,
    //       taste: insertList.taste,
    //       price: insertList.price,
    //     });
    //     alert("등록되었습니다");
    //     window.location.reload();
    //   }
    // })
    return (
        <div>
            <UserContext.Provider value={{ userList: userList }}>
        <UserListPage />
      </UserContext.Provider>
      <UserAddPage  />
        </div>
    );
};

export default UserDataCenter;