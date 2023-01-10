import React, { useState } from "react";
import Swal from "sweetalert2";
import "./Header_SearchBar.scss";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { blockSelector } from "../../../Recoil/Selector";

const Header_SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const blockData = useRecoilValue(blockSelector);
  const navigate = useNavigate();

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    // 검색창이 비어있으면 알럿창
    if (inputValue.trim() === "") {
      return Swal.fire({
        icon: "warning",
        text: "검색어를 입력해주세요",
        showConfirmButton: false,
        timer: 2000,
      });
    }

    // 검색어 submit시 세부페이지로 이동
    // 1. 블록번호
    if (inputValue.length === 5) {
      navigate(`/block/${inputValue}`);

      // 2. 블록해시
    } else if (inputValue.length <= 45 && inputValue.length >= 44) {
      const blockhashFiltering = blockData.filter((item) => {
        return item.blockhash === inputValue;
      });
      navigate(`/block/${blockhashFiltering[0].blocknum}`);

      // 3. 트랜잭션해시 (권한 필요)
    } else if (inputValue.length === 66) {
      // 방법1
      // if(권한 있으면){
      //   페이지 넘겨주기
      // }else{
      //   권한 없으면 alert창
      // }

      // 방법2
      // 권한이 있으면 ? 페이지 넘겨주기 : aler창

      navigate(`/transaction`);
    } else {
      Swal.fire({
        icon: "warning",
        text: "다시 입력하세요.",
        showConfirmButton: false,
        timer: 2000,
      });
    }

    setInputValue("");
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
