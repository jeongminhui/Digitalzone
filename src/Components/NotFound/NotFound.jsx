import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.scss";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="NotFound">
      <div className="NotFound_text">
        <h1>잘못된 접근입니다</h1>
        <button onClick={() => navigate("/")}>메인으로 돌아가기</button>
      </div>
      <div className="NotFound_img">
        <img
          src={`${process.env.PUBLIC_URL}/assets/NotFound.svg`}
          alt="notFound"
        />
      </div>
    </div>
  );
};

export default NotFound;
