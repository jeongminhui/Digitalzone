import React from 'react';

const SignInInput = () => {
    return (
        <div>
            <form>
                <h1>로그인</h1>
                <div>
                    아이디:
                    <input
                        type='email'
                        className='signInEmail'
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </div>
                <div>
                    비밀번호:
                    <input
                        type='password'
                        className='signInPassword'
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>
                <button type='submit' className='SignInButton' onClick={clickHandler}>
                    로그인
                </button>
            </form>
            <button type='submit' className='deleteUser' onClick={deleteUser}>
                사용자 삭제
            </button>
        </div>
    );
};

export default SignInInput;