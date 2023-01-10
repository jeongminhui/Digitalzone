import { collection, doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { db } from '../../firebase';
import Footer from '../Footer/Footer';
import Chart from './Chart';
import Grafana from './Grafana';
import "./NodeDetail.scss"

const NodeDetail = () => {
    const nodeCollection = collection(db, "node1");
    const { nodename } = useParams();
    const [ip, setIp] = useState('');

    useEffect(() => {
        async function getNode() {
        const docRef = doc(nodeCollection, nodename);
        const data = await getDoc(docRef);       
        setIp(data.data().ipaddress);
        }
     
        getNode();
        }, []);
    
    return (
        <div className="NodeDetail">
            <div className='DetailWrap'> 
            <h1>노드</h1>
            <div className='subTitle'>
                <h3> <span className='subBar'>|</span> 상세정보</h3>
                <Link to="/node"><button className='listBtn'>목록으로</button></Link>
            </div>
            <div> { nodename } <span>({ip})</span></div>
            <Chart/>
            </div>​
            <Footer/>
        </div>

    );
};

export default NodeDetail;