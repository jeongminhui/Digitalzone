import React from "react";
import { useState } from "react";

const Time = () => {
  const [time, setTime] = useState("0000-00-00 00:00:00");

  function Timer() {
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + date.getMonth() + 1).slice(-2);
    const days = ("0" + date.getDate()).slice(-2);
    const hour = ("0" + date.getHours()).slice(-2);
    const min = ("0" + date.getMinutes()).slice(-2);
    const sec = ("0" + date.getSeconds()).slice(-2);
    setTime(`${year}-${month}-${days} ${hour}:${min}:${sec}`);
  }

  setInterval(Timer, 1000);

  return <div className="Time">{time}</div>;
};

export default Time;
