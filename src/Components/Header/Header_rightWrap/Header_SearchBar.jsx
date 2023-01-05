import React, { useState } from "react";
import "./Header_SearchBar.scss";

const Header_SearchBar = () => {
  const [inputValue, setInputValue] = useState("");

  const searchSubmitHandler = () => {};

  const searchInputHandler = (e) => {
    setInputValue(e.target.value);
  };

  const searchClickHandler = (e) => {
    e.preventDefault();
  };

  console.log(inputValue);

  return (
    <div className="Header_SearchBar">
      <form onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="블록번호 / 블록해시 / 트랜잭션해시"
          onChange={searchInputHandler}
        />
        <button onClick={searchClickHandler}></button>
      </form>
    </div>
  );
};

export default Header_SearchBar;
