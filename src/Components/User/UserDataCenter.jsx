import React from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import UserListPage from "./UserManagementComponents/UserListPage";
import { UserContext } from "./UserManagementComponents/UserContext";

const UserDataCenter = () => {
  const userCollection = collection(db, "users");
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
  return (
    <div>
      <UserContext.Provider value={{ userList: userList }}>
        <UserListPage />
      </UserContext.Provider>
    </div>
  );
};

export default UserDataCenter;
