import { createGlobalStyle } from "styled-components";

const Globalstyle = createGlobalStyle`
  body {
    background-color:${(props) => props.theme.bg_to_darkmode}; 
  }
 
  /////////////////////////// 헤더, 푸터 ///////////////////////////
  // 검색창 
  .HeaderSearchBarStyle{
    background-color:${(props) => props.theme.footer_to_darkgrey};
    color:${(props) => props.theme.darkgrey_to_footer};
  }

  // 다크모드버튼, 유저버튼
  .HeaderBtn{
    background-color:${(props) => props.theme.white_to_darkgrey};
    box-shadow:${(props) => props.theme.boxShadow_Header};
  }

  // 다크모드 아이콘
  .HeaderDarkmode svg{
    color:${(props) => props.theme.lightgery_to_footer};
  }

  // 유저 아이콘
  .HeaderUserIcon .PersonRoundedIcon path{
    color:${(props) => props.theme.point_to_footer};
  }
  
  // 푸터
  .Footer{
    background-color:${(props) => props.theme.footer_to_darkmode};
  }


  
  /////////////////////////// 대시보드 ///////////////////////////
  // 상단 container1 박스
  .TotalBlock a{
    background-color:${(props) => props.theme.bg_totalBlock};
    color:${(props) => props.theme.color_totalBlock}
  }
  .TotalTransaction a{
    background-color:${(props) => props.theme.bg_totalTransaction};
    color:${(props) => props.theme.color_totalTransaction}
  }
  .ActiveNetwork a{
    background-color:${(props) => props.theme.bg_activeNetwork};
    color:${(props) => props.theme.color_activeNetwork};
  }
  .TotalService a{
    background-color:${(props) => props.theme.bg_totalService};
    color:${(props) => props.theme.color_totalService};
  }

  // 상단 container1 아이콘
  .TotalBlock .Dashboard_icon{
    background-color:${(props) => props.theme.bg_totalBlockIcon};
  }
  .TotalTransaction .Dashboard_icon{
    background-color:${(props) => props.theme.bg_totalTransactionIcon};
  }
  .ActiveNetwork .Dashboard_icon{
    background-color:${(props) => props.theme.bg_activeNetworkIcon};
  }
  .TotalService  .Dashboard_icon{
    background-color:${(props) => props.theme.bg_totalServiceIcon};
  }

  // 활성 네트워크 span, 시간정보 
  .ActiveNetwork span,
  .Dashboard_time {
    color:${(props) => props.theme.lightgrey_to_bg};
  }

  // 상단아이콘 - border
  .Dashboard_iconBorder{
    border:${(props) => props.theme.border_dashboardIcon};
  }
  
  // 대시보드 차트박스
  .Dashboard_chartBox{
    background-color:${(props) => props.theme.white_to_dark};
    box-shadow:${(props) => props.theme.boxShadow};
    color:${(props) => props.theme.darkgrey_to_bg};
  }



  /////////////////////////// 블록 트랜잭션 노드 서비스 ///////////////////////////
  // 타이틀 공통   // 테이블 페이지네이션 토글
  h1.mainTitle,
  .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon path{
    color:${(props) => props.theme.black_to_white};
  }

  // 서브타이틀 공통
  h3.subTitle,
  h3.detailInfoTitle,
  .detailInfoTitle{
   color:${(props) => props.theme.black_to_bg};
  }

  // 블록, 트랜잭션 상세 박스
  .detailInfoBox{
    background-color:${(props) => props.theme.white_to_dark};
  }
  
  // 트랜잭션 상세 데이터 박스
  .txdataWrap{
    background-color:${(props) => props.theme.txdataWrap};
  }

  // 노드탭
  .Node .tabs{
    box-shadow:${(props) => props.theme.boxShadow_nodeTabs};
  }
  .Node .tab{
    background-color:${(props) => props.theme.transparent_to_dark};
    color:${(props) => props.theme.lightgery_to_footer};
  }

  // 노드 차트박스   // 블록, 트랜잭션 상세 박스
  .ChartVol,
  .detailInfoBox{
    background-color:${(props) => props.theme.bg_to_dark};
    box-shadow:${(props) => props.theme.boxShadow};
  }

  // 노드 상세   // 블록, 트랜잭션 상세 박스   // 트랜잭션 상세 데이터 박스
  .nodeContent,
  .detailInfoBox,
  .txdataWrap{
    color:${(props) => props.theme.darkgrey_to_bg};
  }
  
  // point-color 텍스트 (블록, 트랜잭션, 서비스)
  .Block .wrapper .blocknum,
  .Transaction .wrapper .txnum,
  .Service .wrapper .service {
    color:${(props) => props.theme.point_to_bgcolor};
  }

  // Refresh 새로고침
  .Refresh svg path{
    stroke:${(props) => props.theme.refresh};
  }



  /////////////////////////// 사용자 ///////////////////////////
  // 로그인, 나의정보 배경+박스쉐도우
  .LoginBox,
  .MyInfoPagePage .MyInfoPage{
    background-color:${(props) => props.theme.white_to_dark};
    box-shadow:${(props) => props.theme.boxShadow};
  }
  
  // 로그인 input
  .LoginForm, .LoginForm input{
    background-color:${(props) => props.theme.white_to_darkgrey};
    color:${(props) => props.theme.darkgrey_to_footer};
  }

  // 나의정보 사용자 icon
  .MyInfoPage_top_left svg{
    color:${(props) => props.theme.user_img};
  }
  
  // 나의정보 사용자이름
  .MyInfoPage_username{
    color:${(props) => props.theme.black_to_white};
  }

  // 나의정보 텍스트 색상
  .MyInfoPage_black_txt,
  .MyInfoPage .ant-form-item .ant-form-item-label > label{
    color:${(props) => props.theme.black_to_bg} !important;
  }

  // 나의정보 비밀번호 input
  .MyInfoPage_inputBox, .MyInfoPage_inputBox input{
    background-color:${(props) => props.theme.white_to_dark};
    color:${(props) => props.theme.black_to_footer};
  }

  // 나의정보 비밀번호 icon
  .ant-input-password-icon svg{
    color:${(props) => props.theme.lightgrey_to_bg};
  }

  // 나의정보 체크박스
  .ant-checkbox-disabled .ant-checkbox-inner:after{
    border-color:${(props) => props.theme.checkbox_color};
  }
  
  // 나의정보 텍스트
  .css-dev-only-do-not-override-k83k30 label span{
    color:${(props) => props.theme.checkbox_color};
  }
  
  `;

export default Globalstyle;
