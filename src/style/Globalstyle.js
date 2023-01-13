import { createGlobalStyle } from "styled-components";

const Globalstyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.bgColor};
    color:${(props) => props.theme.textColor};
    
  }
  
  .Dashboard_title{
    color:${(props) => props.theme.dashboardChartText};

  }

  // 헤더 버튼
  .HeaderUserIcon, .HeaderDarkmode{
    box-shadow: ${(props) => props.theme.modeBtnBoxShadow};
  }
 .HeaderDarkmode button{
  color: ${(props) => props.theme.modeBtnBoxShadow};
 }
 .HeaderDarkmode button path{
  background-color:  ${(props) => props.theme.pointColor};
 }
`;

export default Globalstyle;
