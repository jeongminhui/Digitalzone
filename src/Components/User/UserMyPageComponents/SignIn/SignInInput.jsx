import React from 'react';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { loginSelector } from '../../../../Recoil/Selector';

const SignInInput = ({ loginClickHandler }) => {
    // recoil test
    const loginUser = useRecoilValue(loginSelector);
    console.log(loginUser);
    // 스테이트 저장소
    const [logindata, setLogindata] = useState({});

    // 클릭 + 로그인 데이터 전달
    const changeHandler = (e) => {
        e.preventDefault();
        const nextUserdata = {
            ...logindata,
            [e.target.name]: e.target.value,
        };
        setLogindata(nextUserdata);
    };
    const clickHandler = (e) => {
        e.preventDefault();
        loginClickHandler(logindata);
    };

    return (
        <div>
            {/* <form>
                <h1>로그인</h1>
                <div>
                    아이디:
                    <input type='email' name='email' className='signInEmail' onChange={changeHandler} />
                </div>
                <div>
                    비밀번호:
                    <input type='password' name='password' className='signInPassword' onChange={changeHandler} />
                </div>
                <button type='submit' className='SignInButton' onClick={clickHandler}>
                    로그인
                </button>
            </form> */}
        </div>
    );
};

export default SignInInput;
