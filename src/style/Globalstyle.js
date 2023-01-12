import { createGlobalStyle } from "styled-components";

const Globalstyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.bgColor};
    color:${(props) => props.theme.textColor};
  }

  .LineChart, .MixedChart, .FillChart{
    box-shadow: ${(props) => props.theme.boxShadowMenutab};
    border : 2px solid ${(props) => props.theme.lightGreyColor}
  }

  .toggle{
    background-color: ${(props) => props.theme.lightGreyColor};
  }
`;

export default Globalstyle;
