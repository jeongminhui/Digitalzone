import React, { useContext, useEffect, useState } from "react";
import { GrRefresh } from "react-icons/gr";
import { ThemeContext } from "../Context/ThemeContext";
import "./Refresh.scss";

const Refresh = () => {
  // const [time, setTime] = useState(0);

  const [time, setTime] = useState(0);

  // 다크모드
  const darkmodeTheme = useContext(ThemeContext);
  const darkmode = darkmodeTheme.isDarkMode;

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);
    const timer1 = setTimeout(() => {
      window.location.reload();
      setTime(0);
    }, 30000);
    return () => clearInterval(timer1);
  }, []);

  const refreshHandler = () => {
    window.location.reload();
  };
  const refreshTime = () => {
    setTime(0);
  };
  return (
    <div className="Refresh">
      <div className="Refresh_wrap">
        <GrRefresh
          className="Refresh_icon"
          onClick={() => {
            refreshHandler();
            refreshTime();
          }}
          size="19"
        />{" "}
        <span
          style={{
            color: darkmode ? "var(--bg-color)" : "#888888",
          }}
        >
          {time}초 전
        </span>
      </div>
    </div>
  );
};

export default Refresh;
