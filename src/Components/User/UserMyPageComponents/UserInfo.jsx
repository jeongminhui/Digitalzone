import { getAuth, updatePassword } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { UserContext } from './UserContext';

const UserInfo = () => {
    //Context
    const { loginUser, userlist } = useContext(UserContext);

    //Auth
    const auth = getAuth();
    const currentUser = auth.currentUser;

    //State 저장소
    const [userpw, setUserpw] = useState("");
    const [pwcheck,setPwcheck] = useState("");

    //비밀번호 변경
    const pwChangeHandler = (e) => {
        e.preventDefault();
        updatePassword(currentUser, userpw)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: '비밀번호가 변경되었습니다',
                    showConfirmButton: false,
                    timer: 2000,
                });
            })
            .catch((error) => {
                console.log(error.message);
            });
        setUserpw('');
        setPwcheck('');
    };
    
console.log(loginUser);
    return (
        <div>
            <form> userpw pwcheck pwChangeHandler
            <h1>사용자 정보</h1>
            <div><sapn>아이콘</sapn><span>김승희</span><span>디지털존</span></div>
            <div><span>이메일(아이디) : </span><span>{loginUser.userid}</span></div>
            <div className='signin pw'>
                            비밀번호: <input type='password' className='userpw' value={userpw} onChange={(e) => setUserpw(e.target.value)} />
                        </div>
                        <div className='signin pwcheck'>
                            비밀번호 재확인: <input type='password' className='userpwcheck' value={pwcheck} onChange={(e) => setPwcheck(e.target.value)} />
                            <button type='submit' onClick={pwChangeHandler}>
                                변경
                            </button>
                            <span className='notsamepw'> 비밀번호가 일치하지 않습니다</span>
                        </div>
                        <div className='natvaildpw' style={{ color: '#4665F9' }}>
                            ※ 8자리 이상 영문 대 소문자, 숫자, 특수문자를 입력하세요
                        </div>
                    </form>
        </div>
    );
};

export default UserInfo;