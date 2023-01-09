import React from 'react';
import './User.scss';
import Footer from '../Footer/Footer';
import Modal1 from './UserModalTest/Modal1';
import SignUp from './UserMyPageComponents/SignUp';
import SignIn from './UserMyPageComponents/SignIn';
import UserUpdate from './UserMyPageComponents/UserUpdate';
import UserListPage from './UserMyPageComponents/UserListPage'
const User = () => {
    return (
        <div className='User'>
            {/* <UserDataCenterV2 /> */}
            <SignUp />
            <SignIn />
            <UserUpdate />
            <UserListPage />
            {/* <SignInInput /> */}
            {/* <Modal1 /> */}
            <Footer />
        </div>
    );
};

export default User;
