<<<<<<< HEAD
import React from 'react';
import './User.scss';
import Footer from '../Footer/Footer';
import UserMyPage from './UserMyPageComponents/UserMyPage';

const User = () => {
    return (
        <div className='User'>
            <div className='UserTopContainer'>
                <div className='UserTopContainer_left'>
                    <h1>사용자 정보</h1>
                    <h3>
                        <span>
                            <b>|</b>
                        </span>
                        전체 사용자
                    </h3>
                </div>
                <div className='UserTopContainer_right'>
                    <button>사용자 추가</button>
                </div>
            </div>
            {/* <UserDataCenter /> */}
            <Footer />
            <UserMyPage />
        </div>
    );
=======
import React from "react";
import "./User.scss";
import Footer from "../Footer/Footer";
import UserDataCenter from "./UserManagementComponents/UserDataCenter";
import UserAddPage from "./UserAddPage";
import UserMyPage from "./UserMyPageComponents/UserMyPage";
import UserListPage from "./UserManagementComponents/UserListPage";

const User = () => {
  return (
    <div className="User">
      {/* <UserDataCenter /> */}
      {/* 파이어베이스 떄문인지 아직도 화면 안뜸. 그래서 주석처리함. */}
      {/* <UserListPage /> */}
      <UserMyPage />
      <Footer />
    </div>
  );
>>>>>>> 02e16cea4705bdf91173b97ab41423a73208b8c6
};

export default User;
