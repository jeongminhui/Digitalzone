import { createGlobalStyle } from "styled-components";

const Globalstyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.bg_Color}; 
  }
 
  /////////////////////////// 헤더 ///////////////////////////
  // 검색창 - bg
  .HeaderSearchBar form, 
  .HeaderSearchBar input{
    background-color: ${(props) => props.theme.bg_searchBar};
    color :  ${(props) => props.theme.color_searchBar};
  }

  // 다크모드버튼, 유저버튼 - bg, boxshadow 
  .HeaderDarkmode, .HeaderUserIcon{
    background-color: ${(props) => props.theme.bg_HeaderBtn};
    box-shadow: ${(props) => props.theme.boxShadow_Header};
  }

  // 다크모드 아이콘 - color
  .HeaderDarkmode svg{
    color : ${(props) => props.theme.color_DarkmodeBtn}
  }

  // 유저 아이콘 - color
  .HeaderUserIcon .PersonRoundedIcon path{
    color : ${(props) => props.theme.color_UserBtn}
  }
 

  
  /////////////////////////// 푸터 ///////////////////////////
  // 푸터 - bg
  .Footer{
    background-color : ${(props) => props.theme.bg_footer}
  }



  /////////////////////////// 대시보드 ///////////////////////////
  // 상단 container1 - 박스 bg, color
  .TotalBlock a{
    background-color: ${(props) => props.theme.bg_totalBlock};
    color : ${(props) => props.theme.color_totalBlock}
  }
  
  .TotalTransaction a{
    background-color: ${(props) => props.theme.bg_totalTransaction};
    color : ${(props) => props.theme.color_totalTransaction}
  }
  .ActiveNetwork a{
    background-color: ${(props) => props.theme.bg_activeNetwork};
    color: ${(props) => props.theme.color_activeNetwork};
  }
  .TotalService a{
    background-color: ${(props) => props.theme.bg_totalService};
    color: ${(props) => props.theme.color_totalService};
  }

  // 상단 container1 - 아이콘 bg
  .TotalBlock .Dashboard_icon{
    background-color: ${(props) => props.theme.bg_totalBlockIcon};
  }
  .TotalTransaction .Dashboard_icon{
    background-color: ${(props) => props.theme.bg_totalTransactionIcon};
  }
  .ActiveNetwork .Dashboard_icon{
    background-color: ${(props) => props.theme.bg_activeNetworkIcon};
  }
  .TotalService  .Dashboard_icon{
    background-color: ${(props) => props.theme.bg_totalServiceIcon};
  }

  // 활성 네트워크 span - color
  .ActiveNetwork span{
    color: ${(props) => props.theme.color_dashboardTime};
  }

  // 시간정보 - color
  .Dashboard_time {
    color: ${(props) => props.theme.color_dashboardTime};
  }

  // 아이콘 - border
  .Dashboard_container1 .Dashboard_icon{
    border:${(props) => props.theme.border_dashboardIcon};
  }
  
  // 차트 - bg, color, box-shadow
  .Dashboard_container2 >div{
    background-color: ${(props) => props.theme.bg_dashboardChart};
    box-shadow: ${(props) => props.theme.boxShadow};
    color:${(props) => props.theme.color_dashboardChart};
  }






`;

export default Globalstyle;
