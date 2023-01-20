"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.theme = exports.darkTheme = exports.lightTheme = void 0;
// --point-color: #4669f5;
// --bg-color: #fafbff;
// --darkmode-color: #282c35;
// --light-grey-color: #888888;
// --dark-grey-color: #3d3d3d;
// --dark-color: #32363e;
// --black-color: #111111;
// --footer-color: #ebedf3;
// --box-shadow: 0px 0px 20px rgba(136, 136, 136, 0.15);
// --box-shadow-menutab: 0px 5px 15px rgba(0, 0, 0, 0.25);
// --box-shadow-header: 0px 0px 12px rgba(209, 209, 209, 0.4);
// --box-shadow-chart-tooltip: 0px 1px 2px rgba(136, 136, 136, 0.5);
var lightTheme = {
  bg_to_darkmode: "var(--bg-color)",
  bg_to_dark: "var(--bg-color)",
  white_to_darkgrey: "#fff",
  white_to_dark: "#fff",
  point_to_footer: "var(--point-color)",
  point_to_bgcolor: "var(--point-color)",
  lightgery_to_footer: "var(--light-grey-color)",
  lightgrey_to_bg: " var(--light-grey-color)",
  darkgrey_to_footer: "var(--dark-grey-color)",
  darkgrey_to_bg: "var(--dark-grey-color)",
  black_to_white: "var(--black-color)",
  black_to_bg: "#000",
  black_to_footer: "#000",
  footer_to_darkgrey: "var(--footer-color)",
  footer_to_darkmode: "var(--footer-color)",
  transparent_to_dark: "transparent",
  boxShadow: "var(--box-shadow)",
  boxShadow_Menutab: "var(----box-shadow-menutab)",
  boxShadow_Header: "var(--box-shadow-header)",
  boxShadow_nodeTabs: "0 0 20px rgba(136, 136, 136, 0.1)",
  txdataWrap: "#f2f3f6",
  refresh: "#888888",
  user_img: "rgba(0, 0, 0, 0.26)",
  checkbox_color: "rgba(0, 0, 0, 0.25)",
  ///////////////////////// 대시보드 /////////////////////////
  bg_totalBlock: "#eef5ff",
  bg_totalTransaction: "#fff6fb",
  bg_activeNetwork: "#fff7ec",
  bg_totalService: "#e4fbf8",
  color_totalBlock: "#2965ba",
  color_totalTransaction: "#cc2c85",
  color_activeNetwork: "#c08728;",
  color_totalService: "#40b4a4",
  bg_totalBlockIcon: "#2965ba",
  bg_totalTransactionIcon: "#cc2c85",
  bg_activeNetworkIcon: "#c08728;",
  bg_totalServiceIcon: "#40b4a4",
  border_dashboardIcon: " 5px solid var(--bg-color)"
};
exports.lightTheme = lightTheme;
var darkTheme = {
  bg_to_darkmode: "var(--darkmode-color)",
  bg_to_dark: "var(--dark-color)",
  white_to_darkgrey: "var(--dark-grey-color)",
  white_to_dark: "var(--dark-color)",
  point_to_footer: "var(--footer-color)",
  point_to_bgcolor: "var(--bg-color)",
  lightgery_to_footer: "var(--footer-color)",
  lightgrey_to_bg: "var(--bg-color)",
  darkgrey_to_footer: "var(--footer-color)",
  darkgrey_to_bg: "var(--bg-color)",
  black_to_white: "#fff",
  black_to_bg: "var(--bg-color)",
  black_to_footer: "var(--footer-color)",
  footer_to_darkgrey: "var(--dark-grey-color)",
  footer_to_darkmode: "var(--darkmode-color)",
  transparent_to_dark: "var(--dark-color)",
  boxShadow: "none",
  boxShadow_Menutab: "none",
  boxShadow_Header: "none",
  boxShadow_nodeTabs: "none",
  txdataWrap: "var(--dark-color)",
  refresh: "var(--bg-color)",
  user_img: "var(--footer-color)",
  checkbox_color: "var(--light-grey-color)",
  ///////////////////////// 대시보드 ////////////////////////////
  bg_totalBlock: "#229AEE",
  bg_totalTransaction: "#FF316F",
  bg_activeNetwork: "#FFC674",
  bg_totalService: "#28CE88",
  color_totalBlock: "var(--bg-color)",
  color_totalTransaction: "var(--bg-color)",
  color_activeNetwork: "var(--bg-color)",
  color_totalService: "var(--bg-color)",
  bg_totalBlockIcon: "#229AEE",
  bg_totalTransactionIcon: "#FF316F",
  bg_activeNetworkIcon: "#FFC674",
  bg_totalServiceIcon: "#28CE88",
  border_dashboardIcon: " 5px solid var(--darkmode-color)"
};
exports.darkTheme = darkTheme;
var theme = {
  lightTheme: lightTheme,
  darkTheme: darkTheme
};
exports.theme = theme;
var _default = theme;
exports["default"] = _default;