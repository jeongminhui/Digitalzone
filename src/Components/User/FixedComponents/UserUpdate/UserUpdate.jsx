import React, { useState, useEffect } from 'react';
import { db } from '../../../../firebase';
import { collection, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useRecoilValue } from 'recoil';
import { userInfoSelector } from '../../../../Recoil/Selector';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const UserUpdate = () => {
    return <div></div>;
};

export default UserUpdate;
