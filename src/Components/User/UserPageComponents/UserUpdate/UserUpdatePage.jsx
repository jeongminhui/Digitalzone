import React, { useState, useEffect } from 'react';
import UserUpdate from './Components/UserUpdate.jsx';
import Footer from '../../../Footer/Footer';
import './UserUpdatePage.scss';

const UserUpdatePage = () => {
    return (
        <div className='UserUpdatePage'>
            <UserUpdate />
            <Footer />
        </div>
    );
};

export default UserUpdatePage;
