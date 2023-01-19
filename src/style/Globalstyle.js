import { createGlobalStyle } from "styled-components";

const Globalstyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.bg_to_darkmode}; 
  }
 
  /////////////////////////// 헤더, 푸터 ///////////////////////////
  // 검색창 
  .HeaderSearchBarStyle{
    background-color: ${(props) => props.theme.footer_to_darkgrey};
    color :  ${(props) => props.theme.darkgrey_to_footer};
  }

  // 다크모드버튼, 유저버튼
  .HeaderBtn{
    
    background-color: ${(props) => props.theme.white_to_darkgrey};
    box-shadow: ${(props) => props.theme.boxShadow_Header};
  }

  // 다크모드 아이콘
  .HeaderDarkmode svg{
    color : ${(props) => props.theme.lightgery_to_footer}
  }

  // 유저 아이콘
  .HeaderUserIcon .PersonRoundedIcon path{
    color : ${(props) => props.theme.point_to_footer}
  }
  
  // 푸터
  .Footer{
    background-color : ${(props) => props.theme.footer_to_darkmode}
  }


  
  /////////////////////////// 대시보드 ///////////////////////////
  // 상단 container1 박스
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

  // 상단 container1 아이콘
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

  // 활성 네트워크 span, 시간정보 
  .ActiveNetwork span,
  .Dashboard_time {
    color: ${(props) => props.theme.lightgrey_to_bg};
  }

  // 상단아이콘 - border
  .Dashboard_iconBorder{
    border:${(props) => props.theme.border_dashboardIcon};
  }
  
  // 대시보드 차트박스
  .Dashboard_chartBox{
    background-color:${(props) => props.theme.white_to_dark};
    box-shadow: ${(props) => props.theme.boxShadow};
    color:${(props) => props.theme.darkgrey_to_bg};
  }



  /////////////////////////// 블트노서 ///////////////////////////
  // 공통
  h1.mainTitle{
    color : ${(props) => props.theme.black_to_white};
  }
  h3.subTitle,
  h3.detailInfoTitle{
   color : ${(props) => props.theme.black_to_bg};
  }


  // 블록, 트랜잭션 상세 박스
  .detailInfoBox{
    background-color: ${(props) => props.theme.white_to_dark};
    box-shadow: ${(props) => props.theme.boxShadow};
    color: ${(props) => props.theme.darkgrey_to_bg};
  }
  
  // 트랜잭션 상세 데이터 박스
  .txdataWrap{
    background-color: ${(props) => props.theme.txdataWrap};
    color: ${(props) => props.theme.darkgrey_to_bg}; 
  }

  // 노드탭
  .Node .tabs{
    box-shadow : ${(props) => props.theme.boxShadow_nodeTabs};
  }
  
  .Node .tab{
    background-color : ${(props) => props.theme.transparent_to_dark};
    color: ${(props) => props.theme.lightgery_to_footer};
  }

  // 노드 차트박스
  .ChartVol{
    background-color: ${(props) => props.theme.bg_to_dark};
    box-shadow: ${(props) => props.theme.boxShadow};
  }

  // 노드 상세
  .nodeContent{
    color : ${(props) => props.theme.darkgrey_to_bg};
  }
  

  // point color 텍스트
  .Block .wrapper .blocknum,
  .Transaction .wrapper .txnum,
  .Service .wrapper .service {
    color : ${(props) => props.theme.point_to_bgcolor};
  }


// refresh
.Refresh svg path{
  stroke : ${(props) => props.theme.refresh};
}
`;

export default Globalstyle;
