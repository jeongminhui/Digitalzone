import React from "react";

// recoil로 불러오기
import { useRecoilValue } from "recoil";
import { serviceSelector } from "../../../Recoil/Selector";

const TotalService = () => {
  const serviceData = useRecoilValue(serviceSelector);

  return (
    <div className="TotalService">
      <h3>TotalService</h3>
      <div>전체 서비스 등록 건수 : {serviceData.length} </div>
    </div>
  );
};

export default TotalService;
