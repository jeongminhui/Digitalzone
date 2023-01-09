import React from 'react';
import './User.scss';
import Footer from '../Footer/Footer';
import UserMyPage from './UserMyPageComponents/UserMyPage';
import Modal1 from './UserModalTest/Modal1';
import UserDataCenterV2 from './UserMyPageComponents/UserDataCenterV2';
import SignUp from './UserMyPageComponents/SignUp';
import SignIn from './UserMyPageComponents/SignIn';
import SignInInput from './UserMyPageComponents/SignInInput';
import UserUpdate from './UserMyPageComponents/UserUpdate';

const User = () => {
    return (
        <div className='User'>
            {/* <UserDataCenterV2 /> */}
            {/* <SignUp /> */}
            <SignIn />
            <UserUpdate />
            {/* <SignInInput /> */}
            {/* <Modal1 /> */}
            <Footer />
        </div>
    );
};

export default User;
