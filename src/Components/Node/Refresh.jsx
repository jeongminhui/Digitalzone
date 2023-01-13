import React, { useEffect, useState } from "react";
import { GrRefresh } from "react-icons/gr";
import "./Refresh.scss";

const Refresh = () => {
  // const [time, setTime] = useState(0);

  // useEffect(() => {
  //     const timer = setInterval(() => {setTime(time + 1)}, 1000);
  //     const timer1 = setTimeout(() => {setTime(0); window.location.reload()}, 30000)
  //     return () => clearInterval(timer, timer1);
  // },[time])

  // const refreshHandler = () => {
  //     window.location.reload()
  // }
  // const refreshTime = () => {
  //     setTime(0);
  // }
  return (
    <div className="Refresh">
      {/* <GrRefresh onClick={() => {refreshHandler(); refreshTime()}}/><span>{time}초 전</span> */}
    </div>
  );
};

export default Refresh;
