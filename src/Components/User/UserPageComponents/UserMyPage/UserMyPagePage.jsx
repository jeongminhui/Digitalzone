// import UserMyPage from "./Components/UserMyPage";
import React, { useState, useEffect } from 'react';
import Footer from '../../../Footer/Footer';
import './UserMyPagePage.scss';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import UserMyPage from './Components/UserMyPage';
import { useRecoilValue } from 'recoil';
import { loginSelector } from '../../../../Recoil/Selector';

const UserMyPagePage = () => {
    const userid = 'userdatazone01@minions.com';
    const type = '관리자';
    const loginUser = useRecoilValue(loginSelector);
    const [user, setUser] = useState({});

    // 로그인한 사용자 정보 가져오기
    useEffect(() => {
        setUser(loginUser);
    }, [loginUser]);

    return (
        <div className='MyInfoPagePage'>
            <div className='MyInfoPage'>
                <div className='MyInfoPage_top'>
                    <div className='MyInfoPage_top_left'>
                        <AccountCircleRoundedIcon sx={{ fontSize: 80 }} color='disabled' />
                    </div>
                    <div className='MyInfoPage_top_right'>
                        <h1>{user.username}</h1>
                        <h3>{user.userteam}</h3>
                    </div>
                </div>
                <div className='MyInfoPage_bottom'>
                    <UserMyPage />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UserMyPagePage;
