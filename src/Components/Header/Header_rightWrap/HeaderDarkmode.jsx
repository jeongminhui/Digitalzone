import React, { useContext } from "react";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { ThemeContext } from "../../Context/ThemeContext";

const HeaderDarkmode = () => {
  const theme = useContext(ThemeContext);

  return (
    <div className="HeaderDarkmode">
      <button
        type="button"
        onClick={theme.toggleDarkMode}
        className="toggleBtn"
      >
        {theme.isDarkMode ? <BsFillMoonFill /> : <BsFillSunFill />}
      </button>
    </div>
  );
};

export default HeaderDarkmode;
