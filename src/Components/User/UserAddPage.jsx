import React from 'react';
const UserAddPage = () => {
    const
    return (
        <div>
            <p>사용자 추가</p>
            <p>소속</p>
            <input type="text" />
            <p>이메일(아이디)</p>
            <input type="text" />
            <span>@</span>
            <select>
                <option value="naver">naver</option>
                <option value="google">google</option>
            </select>
            <p>비밀번호</p>
            <input type="text" />
            <p>비밀번호 재확인</p>
            <input type="text" />
            <p>상세정보 접근 권한</p>
            <input type="checkbox" id='dashboard' onChange={changeHandler} /><label for ='dashboard'>대시보드</label>
            <input type="checkbox" id='block' /><label for ='block'>블록</label>
            <input type="checkbox" id='transaction' /><label for ='transaction'>트랜잭션</label>
            <input type="checkbox" id='node' /><label for ='node'>노드</label>
            <input type="checkbox" id='service' /><label for ='service'>서비스</label>
            <p>이용중인 서비스</p>
            <input type="checkbox" id='service_a' /><label for ='service_a'>A서비스</label>
            <input type="checkbox" id='service_b' /><label for ='service_b'>B서비스</label>
            <input type="checkbox" id='service_c' /><label for ='service_c'>C서비스</label>
            <input type="checkbox" id='service_d' /><label for ='service_d'>D서비스</label>
            <input type="checkbox" id='service_e' /><label for ='service_e'>E서비스</label>
        </div>
    );
};

export default UserAddPage;