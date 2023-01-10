import { getAuth } from 'firebase/auth';
import { collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../../../firebase';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { useRecoilState } from 'recoil';
import { userInfoAtom } from '../../../../Recoil/Atom';
import { useNavigate } from 'react-router-dom'

const UserList = () => {
    // 스테이트 저장소
    const [userlist, setUserlist] = useState([]);

    // firebase 연결
    const userCollection = collection(db, 'users');

    // 어스
    const auth = getAuth();

   // 리코일 스테이츠
   const [clickedUserInfo, setClickedUserInfo] = useRecoilState(userInfoAtom)

   // navigate
   const navigate = useNavigate()

    // 특정 유저 데이터 가져오기 -> 아톰 전달 / 수정 페이지 이동 
    const onClickHandler = async (uid) => {
        const docRef = doc(userCollection, uid);
        const clickedUser= await getDoc(docRef);
        const clickedUserData = clickedUser.data();
        setClickedUserInfo(clickedUserData);
        navigate("/userupdate")
    }
    console.log(clickedUserInfo);

    // 전체 유저 데이터 가져오기
    useEffect(() => {
        async function getUsers() {
            const data = await getDocs(userCollection);
            setUserlist(
                data.docs.map((item) => ({
                    ...item.data(),
                }))
            );
        }
        getUsers();
    }, []);

        // 특정 유저 데이터 삭제하기
        const deleteHandler = async (uid, e) => {
            if (window.confirm('정말 삭제하시겠습니까?')) {
                await deleteDoc(doc(userCollection, uid));
                alert('삭제되었습니다');
                window.location.reload();
            } else {
                alert('취소되었습니다.');
            }
        };
    


    // 블트노 권한에 따른 OX 표시 함수
    const adminList = (data) => {
        if (data === true) {
            return '○';
        } else {
            return '✕';
        }
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>유형</th>
                        <th>이름</th>
                        <th>소속</th>
                        <th>이메일(아이디)</th>
                        <th>대시보드</th>
                        <th>블록</th>
                        <th>트랜잭션</th>
                        <th>노드</th>
                        <th>서비스</th>
                        <th>이용중인 서비스</th>
                        <th>등록일자</th>
                        <th>상태</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {userlist.map((user, idx) => (
                        <tr key={idx} onClick={(e) => onClickHandler(user.uid, e)}>
                            <td onClick={(e) => e.stopPropagation()}>{idx + 1}</td>
                            <td onClick={(e) => e.stopPropagation()}>{user.userclass}</td>
                            <td>{user.username}</td>
                            <td onClick={(e) => e.stopPropagation()}>{user.userteam}</td>
                            <td>{user.userid}</td>
                            <td onClick={(e) => e.stopPropagation()}>{adminList(user.useradmin.dashboard)}</td>
                            <td onClick={(e) => e.stopPropagation()}>{adminList(user.useradmin.block)}</td>
                            <td onClick={(e) => e.stopPropagation()}>{adminList(user.useradmin.transaction)}</td>
                            <td onClick={(e) => e.stopPropagation()}>{adminList(user.useradmin.node)}</td>
                            <td onClick={(e) => e.stopPropagation()}>{adminList(user.useradmin.service)}</td>
                            <td onClick={(e) => e.stopPropagation()}>{user.serviceCnt}</td>
                            <td onClick={(e) => e.stopPropagation()}>{user.userdate}</td>
                            <td onClick={(e) => e.stopPropagation()}>{user.userstatus}</td>
                            <td onClick={(e) => e.stopPropagation()}>
                                <button type='submit' className='DeleteButton' onClick={(e) => deleteHandler(user.uid, e)}>
                                    삭제
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* <Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} ariaHideApp={false}>
                <div>{modalUser.username}</div>
                <div>{modalUser.userteam}</div>
                <div>아이디(이메일) {modalUser.userid}</div>
                <form>
                    <div>
                        상세정보 접근 권한
                        <label>
                            <input type='checkbox' checked disabled />
                            대시보드
                        </label>
                        <label>
                            <input type='checkbox' checked disabled />
                            블록
                        </label>
                        <label>
                            {tran === true ? <input type='checkbox' id='transaction' name='checkbox' defaultChecked onChange={adminChangeHandler} /> : <input type='checkbox' id='transaction' name='checkbox' onChange={adminChangeHandler} />}
                            트랜잭션
                        </label>
                        <label>
                            {node === true ? <input type='checkbox' id='node' name='checkbox'  defaultChecked onChange={adminChangeHandler} /> : <input type='checkbox' id='node' name='checkbox' onChange={adminChangeHandler} />}
                            노드
                        </label>
                        <label>
                            {serv === true ? <input type='checkbox' id='service' name='checkbox' defaultChecked  onChange={adminChangeHandler} /> : <input type='checkbox' id='service' name='checkbox' onChange={adminChangeHandler} />}
                            서비스
                        </label>
                    </div>
                    <div>
                        이용중인 서비스:
                        <label>
                            {svcA === true ? <input type='checkbox' id='service_a' name='checkbox'  defaultChecked onChange={serviceChangeHandler} /> : <input type='checkbox' id='service_a' name='checkbox' onChange={serviceChangeHandler} />}
                            A서비스
                        </label>
                        <label>
                            {svcB === true ? <input type='checkbox' id='service_b' name='checkbox' defaultChecked onChange={serviceChangeHandler} /> : <input type='checkbox' id='service_b' name='checkbox' onChange={serviceChangeHandler} />}
                            B서비스
                        </label>
                        <label>
                            {svcC === true ? <input type='checkbox' id='service_c' name='checkbox' defaultChecked onChange={serviceChangeHandler} /> : <input type='checkbox' id='service_c' name='checkbox' onChange={serviceChangeHandler} />}
                            C서비스
                        </label>
                        <label>
                            {svcD === true ? <input type='checkbox' id='service_d' name='checkbox' defaultChecked onChange={serviceChangeHandler} /> : <input type='checkbox' id='service_d' name='checkbox' onChange={serviceChangeHandler} />}
                            D서비스
                        </label>
                        <label>
                            {svcE === true ? <input type='checkbox' id='service_e' name='checkbox' defaultChecked onChange={serviceChangeHandler} /> : <input type='checkbox' id='service_e' name='checkbox' onChange={serviceChangeHandler} />}
                            E서비스
                        </label>
                    </div>
                </form>
                <div>유형 {modalUser.userclass}</div>
                <div>등록일자 {modalUser.userdate}</div>
                <div>상태 {modalUser.userstatus}</div>
                <button type='submit' onClick={changeHandler}>
                    정보 변경
                </button>
                <button type='submit' onClick={modalDeleteHandler}>
                    사용자 삭제
                </button>
            </Modal> */}
        </div>
    );
};

export default UserList;
