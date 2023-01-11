import { collection, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../../../firebase';
import { useRecoilState } from 'recoil';
import { userInfoAtom } from '../../../../Recoil/Atom';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const UserList = () => {
    return <div></div>;
};

export default UserList;
