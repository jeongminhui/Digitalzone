import React from "react";
import "./User.scss";
import Footer from "../Footer/Footer";
import Modal1 from "../CommonComponents/Modal/Modal1";
import UserInsertModal from "./UserInsertComponents/UserInsertModal";
import UserAdd from "./FixedComponents/UserAdd/UserAdd";
import UserList from "./FixedComponents/UserList/UserList";
import UserLogin from "./FixedComponents/UserLogin/UserLogin";
import UserMyPage from "./FixedComponents/UserMyPage/UserMyPage";
import UserUpdate from "./FixedComponents/UserUpdate/UserUpdate";
import UserAddModal from "./UserPageComponents/UserAdd/Components/UserAddModal";

const User = ({ history }) => {
  return (
    <div className="User">
      {/* <UserInsertModal /> */}
      <UserAddModal />
    </div>
  );
};

export default User;
