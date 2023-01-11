import React, { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { db } from '../../../../firebase';
import { collection, doc, getDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { useRecoilState } from 'recoil';
import { loginAtom } from '../../../../Recoil/Atom';

const UserLogin = () => {
    return <div>로그인</div>;
};

export default UserLogin;
