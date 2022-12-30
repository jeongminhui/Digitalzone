import React from 'react';
import './User.scss';
import Footer from '../Footer/Footer';
import UserDataCenter from './UserManagementComponents/UserDataCenter';
import UserAddPage from './UserAddPage';

const User = () => {
    return (
        <div className='User'>
            <h1>유저 페이지입니다</h1>
            <UserDataCenter />
            <Footer />
        </div>
    );
};

export default User;
