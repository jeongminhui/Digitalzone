export const lightTheme = {
  bg_Color: "var(--bg-color)",
  pointColor: "var(--point-color)",
  lightGreyColor: "var(--light-grey-color)",
  darkGreyColor: "var(--dark-grey-color)",
  blackColor: "var(--black-color)",
  boxShadow: "var(--box-shadow)",
  boxShadow_Menutab: "var(----box-shadow-menutab)",
  boxShadow_Header: "var(--box-shadow-header)",

  /////////////////////////// 헤더 ///////////////////////////
  bg_searchBar: "var(--footer-color)",
  bg_HeaderBtn: "#fff",
  color_searchBar: "var(--dark-grey-color)",
  color_DarkmodeBtn: "var(--light-grey-color)",
  color_UserBtn: "var(--point-color)",

  /////////////////////////// 푸터 ///////////////////////////
  bg_footer: "var(--footer-color)",

  ///////////////////////// 대시보드 /////////////////////////
  bg_totalBlock: "#eef5ff",
  bg_totalTransaction: "#fff6fb",
  bg_activeNetwork: "#fff7ec",
  bg_totalService: "#e4fbf8",

  bg_totalBlockIcon: "#2965ba",
  bg_totalTransactionIcon: "#cc2c85",
  bg_activeNetworkIcon: "#c08728;",
  bg_totalServiceIcon: "#40b4a4",

  color_totalBlock: "#2965ba",
  color_totalTransaction: "#cc2c85",
  color_activeNetwork: "#c08728;",
  color_totalService: "#40b4a4",

  color_dashboardTime: " var(--light-grey-color)",
  border_dashboardIcon: " 5px solid var(--bg-color)",

  bg_dashboardChart: "#fff",
  color_dashboardChart: "var(--dark-grey-color)",
};

export const darkTheme = {
  bg_Color: "var(--darkmode-color)",
  pointColor: "var(--point-color)", // 변경 전
  lightGreyColor: "var(--light-grey-color)", // 변경 전
  darkGreyColor: "var(--dark-grey-color)", // 변경 전
  blackColor: "var(--black-color)", // 변경 전
  boxShadow: "none",
  boxShadow_Menutab: "none",
  boxShadow_Header: "none",

  /////////////////////////// 헤더 ///////////////////////////
  bg_searchBar: "var(--dark-grey-color)",
  bg_HeaderBtn: "var(--dark-grey-color)",
  color_searchBar: "var(--footer-color)",
  color_DarkmodeBtn: "var(--footer-color)",
  color_UserBtn: "var(--footer-color)",

  /////////////////////////// 푸터 ///////////////////////////
  bg_footer: "var(--darkmode-color)",

  ///////////////////////// 대시보드 ////////////////////////////
  bg_totalBlock: "#229AEE",
  bg_totalTransaction: "#FF316F",
  bg_activeNetwork: "#FFC674",
  bg_totalService: "#28CE88",

  bg_totalBlockIcon: "#229AEE",
  bg_totalTransactionIcon: "#FF316F",
  bg_activeNetworkIcon: "#FFC674",
  bg_totalServiceIcon: "#28CE88",

  color_totalBlock: "var(--bg-color)",
  color_totalTransaction: "var(--bg-color)",
  color_activeNetwork: "var(--bg-color)",
  color_totalService: "var(--bg-color)",

  color_dashboardTime: "var(--bg-color)",
  border_dashboardIcon: " 5px solid var(--darkmode-color)",

  bg_dashboardChart: "#32363E",
  color_dashboardChart: "var(--bg-color)",
};

export const theme = {
  lightTheme,
  darkTheme,
};

export default theme;
