import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SearchIcon from "@mui/icons-material/Search";

// recoil에서 가져오기
import { useRecoilValue } from "recoil";
import { blockSelector, loginSelector } from "../../../Recoil/Selector";

import { useRecoilState } from "recoil";
import { currentBlockAtom } from "../../../Recoil/Atom";

// 검색값 테스트
// 블록번호 : 67526
// 블록해시 : 0x5bf73440adfd11b00eed378b42e94c0a9b6816da14
// 트랜잭션해시 : 0x5f73dabdde7b0b8db4e76a6b8c25a18c730662ec3fe5f145f9aea4ea47cf2362

const HeaderSearchBar = () => {
  const { register, handleSubmit, setValue } = useForm();
  const blockData = useRecoilValue(blockSelector);
  const [currentBlock, setCurrentBlock] = useRecoilState(currentBlockAtom);
  const navigate = useNavigate();

  const loginUser = useRecoilValue(loginSelector);
  const [TranUser, setTranUser] = useState(false);

  useEffect(() => {
    setTranUser(loginUser?.useradmin.transaction);
  }, []);

  function onSubmit(data) {
    // data : input창에 입력된 값을 객체형태로 가져옴 => { searchValue : 입력값}

    if (data.searchValue.trim() === "") {
      console.log("입력칸 공란");
    }

    blockData.map((list) => {
      // 블록넘버
      if (list.blocknum === parseInt(data.searchValue)) {
        setCurrentBlock(list.id-1);
        return navigate(`/block/${list.blocknum}`);

        // 블록해시
      } else if (list.blockhash === data.searchValue) {
        setCurrentBlock(list.id);
        return navigate(`/block/${list.blocknum}`);

        // 트랜잭션해시
      } else if (list.txhash === data.searchValue) {
        if (TranUser) {
          // 트랜잭션 권한있으면
          return navigate(`/transaction/${list.txnum.slice(1, -1)}`);
        } else {
          // 트랜잭션 권한없으면
          return Swal.fire({
            icon: "warning",
            text: "트랜잭션 권한이 없습니다",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      } else {
        // return Swal.fire({
        //   icon: "warning",
        //   text: "다시 입력해주세요",
        //   showConfirmButton: false,
        //   timer: 2000,
        // });
      }
    });

    // submit이후 검색창 비우기
    setValue("searchValue", "");
  }

  return (
    <div className="HeaderSearchBar">
      <form onSubmit={handleSubmit(onSubmit)} className="HeaderSearchBarStyle">
        <input
          type="text"
          placeholder="블록번호 / 블록해시 / 트랜잭션해시"
          {...register("searchValue")}
          className="HeaderSearchBarStyle"
        />
        <button type="submit" className="searchBtn">
          <SearchIcon className="searchIcon" />
        </button>
      </form>
    </div>
  );
};

export default HeaderSearchBar;
