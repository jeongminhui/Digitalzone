import React from 'react';
import './User.scss';
import Footer from '../Footer/Footer';
import UserDataCenter from './UserManagementComponents/UserDataCenter';
import UserAddPage from './UserManagementComponents/UserAddPage';
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
};

export default User;
