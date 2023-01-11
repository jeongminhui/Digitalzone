import React, { useState, useEffect } from 'react';
import { db } from '../../../../firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';

const UserAdd = () => {
    return <div>사용자 추가</div>;
};

export default UserAdd;
