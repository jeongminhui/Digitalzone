import React from "react";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";

const HeaderDarkmode = (props) => {
  const { isdarkmode, toggleDarkMode } = props;
  return (
    <div className="HeaderDarkmode">
      <button
        type="button"
        onClick={toggleDarkMode}
        isdarkmode={isdarkmode}
        className="toggleBtn"
      >
        {isdarkmode ? <BsFillSunFill /> : <BsFillMoonFill />}
      </button>
    </div>
  );
};

export default HeaderDarkmode;
