import React from 'react';
import './User.scss';
import Footer from '../Footer/Footer';
import UserMyPage from './UserMyPageComponents/UserMyPage';
import Modal1 from './UserModalTest/Modal1';
import UserDataCenterV2 from './UserMyPageComponents/UserDataCenterV2';
import SignUp from './UserMyPageComponents/SignUp';

const User = () => {
    return (
        <div className='User'>
            {/* <UserDataCenterV2 /> */}
            <Modal1 />
            <Footer />
            <SignUp />
        </div>
    );
};

export default User;
