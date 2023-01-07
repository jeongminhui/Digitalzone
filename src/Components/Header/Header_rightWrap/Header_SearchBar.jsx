import React, { useState } from "react";
import Swal from "sweetalert2";
import "./Header_SearchBar.scss";
import SearchIcon from "@mui/icons-material/Search";

const Header_SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchText, setSearchText] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    // 비어있으면 알럿창
    if (inputValue.trim() === "") {
      return Swal.fire({
        icon: "warning",
        text: "검색어를 입력해주세요",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setSearchText(inputValue);
    console.log("검색어 : ", inputValue);
    setInputValue("");

    // 구현해야 할 내용
    // 트랜잭션 접근 권한이 있는 사람만 페이지를 이동시켜주는 로직
    // navigate params 사용하기
    // 그외에는 '관리자에게 요청하십시오' alert창
  };

  const searchInputHandler = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="Header_SearchBar">
      <form onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="블록번호 / 블록해시 / 트랜잭션해시"
          onChange={searchInputHandler}
          value={inputValue}
        />
        <button type="submit" className="searchBtn">
          <SearchIcon className="searchIcon" />
        </button>
      </form>
    </div>
  );
};

export default Header_SearchBar;
