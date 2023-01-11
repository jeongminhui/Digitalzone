import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.scss";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="NotFound">
      <div className="NotFound_img">이미지구역</div>
      <div className="NotFound_text">
        <h1>404</h1>
        <h3>Page NotFound!</h3>
        <button onClick={() => navigate("/")}>메인으로 돌아가기</button>
      </div>
    </div>
  );
};

export default NotFound;
