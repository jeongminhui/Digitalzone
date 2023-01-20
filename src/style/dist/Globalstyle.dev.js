"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _styledComponents = require("styled-components");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  body {\n    background-color: ", "; \n  }\n \n  /////////////////////////// \uD5E4\uB354, \uD478\uD130 ///////////////////////////\n  // \uAC80\uC0C9\uCC3D \n  .HeaderSearchBarStyle{\n    background-color: ", ";\n    color :  ", ";\n  }\n\n  // \uB2E4\uD06C\uBAA8\uB4DC\uBC84\uD2BC, \uC720\uC800\uBC84\uD2BC\n  .HeaderBtn{\n    background-color: ", ";\n    box-shadow: ", ";\n  }\n\n  // \uB2E4\uD06C\uBAA8\uB4DC \uC544\uC774\uCF58\n  .HeaderDarkmode svg{\n    color : ", "\n  }\n\n  // \uC720\uC800 \uC544\uC774\uCF58\n  .HeaderUserIcon .PersonRoundedIcon path{\n    color : ", "\n  }\n  \n  // \uD478\uD130\n  .Footer{\n    background-color : ", "\n  }\n\n\n  \n  /////////////////////////// \uB300\uC2DC\uBCF4\uB4DC ///////////////////////////\n  // \uC0C1\uB2E8 container1 \uBC15\uC2A4\n  .TotalBlock a{\n    background-color: ", ";\n    color : ", "\n  }\n  .TotalTransaction a{\n    background-color: ", ";\n    color : ", "\n  }\n  .ActiveNetwork a{\n    background-color: ", ";\n    color: ", ";\n  }\n  .TotalService a{\n    background-color: ", ";\n    color: ", ";\n  }\n\n  // \uC0C1\uB2E8 container1 \uC544\uC774\uCF58\n  .TotalBlock .Dashboard_icon{\n    background-color: ", ";\n  }\n  .TotalTransaction .Dashboard_icon{\n    background-color: ", ";\n  }\n  .ActiveNetwork .Dashboard_icon{\n    background-color: ", ";\n  }\n  .TotalService  .Dashboard_icon{\n    background-color: ", ";\n  }\n\n  // \uD65C\uC131 \uB124\uD2B8\uC6CC\uD06C span, \uC2DC\uAC04\uC815\uBCF4 \n  .ActiveNetwork span,\n  .Dashboard_time {\n    color: ", ";\n  }\n\n  // \uC0C1\uB2E8\uC544\uC774\uCF58 - border\n  .Dashboard_iconBorder{\n    border:", ";\n  }\n  \n  // \uB300\uC2DC\uBCF4\uB4DC \uCC28\uD2B8\uBC15\uC2A4\n  .Dashboard_chartBox{\n    background-color:", ";\n    box-shadow: ", ";\n    color:", ";\n  }\n\n\n\n  /////////////////////////// \uBE14\uD2B8\uB178\uC11C ///////////////////////////\n  // \uACF5\uD1B5\n  h1.mainTitle{\n    color : ", ";\n  }\n  h3.subTitle,\n  h3.detailInfoTitle{\n   color : ", ";\n  }\n  \n  // \uD14C\uC774\uBE14\uD398\uC774\uC9C0\uB124\uC774\uC158 \uD1A0\uAE00\n  .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon path {\n    color : ", ";\n  }\n\n\n  // \uBE14\uB85D, \uD2B8\uB79C\uC7AD\uC158 \uC0C1\uC138 \uBC15\uC2A4\n  .detailInfoBox{\n    background-color: ", ";\n    box-shadow: ", ";\n    color: ", ";\n  }\n  \n  // \uD2B8\uB79C\uC7AD\uC158 \uC0C1\uC138 \uB370\uC774\uD130 \uBC15\uC2A4\n  .txdataWrap{\n    background-color: ", ";\n    color: ", "; \n  }\n\n  // \uB178\uB4DC\uD0ED\n  .Node .tabs{\n    box-shadow : ", ";\n  }\n  \n  .Node .tab{\n    background-color : ", ";\n    color: ", ";\n  }\n\n  // \uB178\uB4DC \uCC28\uD2B8\uBC15\uC2A4\n  .ChartVol{\n    background-color: ", ";\n    box-shadow: ", ";\n  }\n\n  // \uB178\uB4DC \uC0C1\uC138\n  .nodeContent{\n    color : ", ";\n  }\n  \n  // point-color \uD14D\uC2A4\uD2B8\n  .Block .wrapper .blocknum,\n  .Transaction .wrapper .txnum,\n  .Service .wrapper .service {\n    color : ", ";\n  }\n\n  // refresh\n  .Refresh svg path{\n    stroke : ", ";\n  }\n\n\n\n  /////////////////////////// USER ///////////////////////////\n  .LoginBox{\n    background-color : ", ";\n    box-shadow:  ", ";\n  }\n  \n  .LoginForm, .LoginForm input{\n    background-color: ", ";\n    color :  ", ";\n  }\n  \n  \n  \n  \n  .MyInfoPagePage .MyInfoPage{\n    background-color: ", ";\n    box-shadow:  ", ";\n  }\n\n  /* .MyInfoPage_username{\n    color:  ", ";\n  } */\n  \n  .MyInfoPage_black_txt{\n    color:  ", " !important;\n  }\n  \n  .MyInfoPage_inputBox, .MyInfoPage_inputBox input{\n    background-color:  ", " ;\n    color:  ", "\n  }\n\n  .ant-input-password-icon svg{\n    color:", "\n  }\n  \n  .MyInfoPage_username{\n    color:", "\n  }\n\n  .MyInfoPage_top_left svg{\n    color:", "\n  }\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Globalstyle = (0, _styledComponents.createGlobalStyle)(_templateObject(), function (props) {
  return props.theme.bg_to_darkmode;
}, function (props) {
  return props.theme.footer_to_darkgrey;
}, function (props) {
  return props.theme.darkgrey_to_footer;
}, function (props) {
  return props.theme.white_to_darkgrey;
}, function (props) {
  return props.theme.boxShadow_Header;
}, function (props) {
  return props.theme.lightgery_to_footer;
}, function (props) {
  return props.theme.point_to_footer;
}, function (props) {
  return props.theme.footer_to_darkmode;
}, function (props) {
  return props.theme.bg_totalBlock;
}, function (props) {
  return props.theme.color_totalBlock;
}, function (props) {
  return props.theme.bg_totalTransaction;
}, function (props) {
  return props.theme.color_totalTransaction;
}, function (props) {
  return props.theme.bg_activeNetwork;
}, function (props) {
  return props.theme.color_activeNetwork;
}, function (props) {
  return props.theme.bg_totalService;
}, function (props) {
  return props.theme.color_totalService;
}, function (props) {
  return props.theme.bg_totalBlockIcon;
}, function (props) {
  return props.theme.bg_totalTransactionIcon;
}, function (props) {
  return props.theme.bg_activeNetworkIcon;
}, function (props) {
  return props.theme.bg_totalServiceIcon;
}, function (props) {
  return props.theme.lightgrey_to_bg;
}, function (props) {
  return props.theme.border_dashboardIcon;
}, function (props) {
  return props.theme.white_to_dark;
}, function (props) {
  return props.theme.boxShadow;
}, function (props) {
  return props.theme.darkgrey_to_bg;
}, function (props) {
  return props.theme.black_to_white;
}, function (props) {
  return props.theme.black_to_bg;
}, function (props) {
  return props.theme.black_to_white;
}, function (props) {
  return props.theme.white_to_dark;
}, function (props) {
  return props.theme.boxShadow;
}, function (props) {
  return props.theme.darkgrey_to_bg;
}, function (props) {
  return props.theme.txdataWrap;
}, function (props) {
  return props.theme.darkgrey_to_bg;
}, function (props) {
  return props.theme.boxShadow_nodeTabs;
}, function (props) {
  return props.theme.transparent_to_dark;
}, function (props) {
  return props.theme.lightgery_to_footer;
}, function (props) {
  return props.theme.bg_to_dark;
}, function (props) {
  return props.theme.boxShadow;
}, function (props) {
  return props.theme.darkgrey_to_bg;
}, function (props) {
  return props.theme.point_to_bgcolor;
}, function (props) {
  return props.theme.refresh;
}, function (props) {
  return props.theme.white_to_dark;
}, function (props) {
  return props.theme.boxShadow;
}, function (props) {
  return props.theme.white_to_darkgrey;
}, function (props) {
  return props.theme.darkgrey_to_footer;
}, function (props) {
  return props.theme.white_to_dark;
}, function (props) {
  return props.theme.boxShadow;
}, function (props) {
  return props.theme.black_to_bg;
}, function (props) {
  return props.theme.black_to_bg;
}, function (props) {
  return props.theme.white_to_dark;
}, function (props) {
  return props.theme.black_to_footer;
}, function (props) {
  return props.theme.lightgrey_to_bg;
}, function (props) {
  return props.theme.black_to_white;
}, function (props) {
  return props.theme.user_img;
});
var _default = Globalstyle;
exports["default"] = _default;