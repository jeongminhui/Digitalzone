import React from "react";
import ApexLeft from "./ApexLeft";
import ChartLeft from "./ChartLeft";
import ChartRight from "./ChartRight";


const TranMain = () => {
  return (
    <div className="TranMain">
      <div className="ChartContainer">
        <div className="ChartLeft">
          {/* <ChartLeft /> */}
         <ApexLeft/>
        </div>
        <div className="ChartRight">
          <ChartRight />
        </div>
      </div>
    </div>
  );
};

export default TranMain;
