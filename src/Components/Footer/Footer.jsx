import { Link } from "@mui/material";
import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="Footer">
      <div className="Footer_logo">
        <img
          src={`${process.env.PUBLIC_URL}/assets/footerlogo.png`}
          alt="FooterLogo"
          className="footerLogo"
        />
      </div>
      <div className="Footer_infoText">
        <div>
          <Link
            href="https://uni.webminwon.com/wm1.0/jsp/function/etc/personal10.html"
            target="_blank"
          >
            이용약관
          </Link>{" "}
          |{" "}
          <Link
            href="https://uni.webminwon.com/wm1.0/jsp/function/etc/personal6.html?ver=12#reload"
            target="_blank"
          >
            개인정보처리방침
          </Link>{" "}
          | (주)디지털존 | 03920 서울시 마포구 성암로 330 521호 | 고객센터 :
          1644-2378
        </div>
        <div>
          대표 : 심상원,전정우 | 개인정보보호책임자 : 김현석 | Mail :
          cert@digitalzone.co.kr 사업자등록번호 : 105-85-34215 |
          통신판매업신고번호 : 제2012-서울구로-0542호
        </div>
      </div>
      <div className="Footer_markWrap">
        <img
          src={`${process.env.PUBLIC_URL}/assets/mark1_1.png`}
          alt="mark1"
          className="footerMark1"
        />
        <img
          src={`${process.env.PUBLIC_URL}/assets/mark2_1.png`}
          alt="mark2"
          className="footerMark2"
        />
        <img
          src={`${process.env.PUBLIC_URL}/assets/mark3_1.png`}
          alt="mark3"
          className="footerMark3"
        />
      </div>
    </div>
  );
};

export default Footer;
