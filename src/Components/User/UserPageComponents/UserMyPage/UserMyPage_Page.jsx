// import UserMyPage from "./Components/UserMyPage";
import React from "react";
import Footer from "../../../Footer/Footer";
import "./UserMyPage_Page.scss";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import UserMyPage from './Components/UserMyPage';

const UserMyPage_Page = () => {
  const userid = "userdatazone01@minions.com";
  const type = "관리자";

  return (
    <UserMyPage />
  //   <div className="MyInfoPage_Container">
  //     <div className="MyInfoPage">
  //       <div className="MyInfoPage_top">
  //         <div className="MyInfoPage_top_left">
  //           <AccountCircleRoundedIcon sx={{ fontSize: 80 }} color="disabled" />
  //         </div>
  //         <div className="MyInfoPage_top_right">
  //           <h1>김승희</h1>
  //           <h3>디지털존</h3>
  //         </div>
  //       </div>
  //       <div className="MyInfoPage_bottom">
  //         <table>
  //           <tr>
  //             <td className="table_td_left">이메일(아이디)</td>
  //             <td>{userid}</td>
  //           </tr>
  //           <tr>
  //             <td className="table_td_left">비밀번호</td>
  //             <td>
  //               <input type="password" />
  //             </td>
  //           </tr>
  //           <tr>
  //             <td className="table_td_left">비밀번호 재확인</td>
  //             <td>
  //               <input type="password" />
  //             </td>
  //           </tr>
  //           <tr>
  //             <td className="table_td_left">상세정보 접근 권한</td>
  //             <td>
  //               <input type="checkbox" name="" id="" />
  //               <input type="checkbox" name="" id="" />
  //               <input type="checkbox" name="" id="" />
  //               <input type="checkbox" name="" id="" />{" "}
  //             </td>
  //           </tr>
  //           <tr>
  //             <td className="table_td_left">이용중인 서비스</td>
  //             <td>
  //               <input type="checkbox" name="" id="" />
  //               <input type="checkbox" name="" id="" />
  //               <input type="checkbox" name="" id="" />
  //               <input type="checkbox" name="" id="" />
  //             </td>
  //           </tr>
  //           <tr>
  //             <td className="table_td_left">유형</td>
  //             <td>{type}</td>
  //           </tr>
  //           <tr>
  //             <td className="table_td_left">등록일자</td>
  //             <td>{type}</td>
  //           </tr>
  //           <tr>
  //             <td className="table_td_left">상태</td>
  //             <td>{type}</td>
  //           </tr>
  //         </table>
  //       </div>
  //     </div>
  //     <Footer />
  //   </div>
  // );
  )
};

export default UserMyPage_Page;
