import React from "react";

const AllServiceData = (props) => {
  const service = props.serviceData;

  return (
    <div className="AllServiceData">
      <div>전체 서비스 등록 건수 : {service.service.length} </div>
    </div>
  );
};

export default AllServiceData;
