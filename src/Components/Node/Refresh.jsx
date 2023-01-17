import React, { useEffect, useState } from 'react';
import { GrRefresh } from 'react-icons/gr';
import "./Refresh.scss";


const Refresh = () => {

    const [time, setTime] = useState(0);

    
    useEffect(() => {
        const timer = setInterval(() => {setTime(time => time + 1)}, 1000);
        const timer1 = setTimeout(() => {window.location.reload(); setTime(0)}, 3000000)
        return () => clearInterval(timer1)
    },[])

    const refreshHandler = () => {
        window.location.reload()
    }
    const refreshTime = () => {
        setTime(0);
    }
    return (
        <div className='Refresh' onClick={() => {refreshHandler(); refreshTime()}}>
          <GrRefresh/><span>{time}초 전</span>
        </div>
    );
};

export default Refresh;