import React, { useContext, useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import { Link } from "react-router-dom";
import { ThemeContext } from "./../../Context/ThemeContext";

// recooil로 불러오기
import { useRecoilValue } from "recoil";
import { serviceSelector } from "../../../Recoil/Selector";

const NtwActiveService = () => {
  const theme = useContext(ThemeContext);
  const darkmode = theme.isDarkMode;

  const serviceData = useRecoilValue(serviceSelector);
  const [service, setService] = useState("");

  // 상태가 성공인 데이터만 필터링
  useEffect(() => {
    async function getActive() {
      const data = await serviceData;
      const dataFiltering = data.filter((item) => {
        return item.status === "성공";
      });
      makeChartData(dataFiltering);
    }
    getActive();
  }, [serviceData]);

  let lengthA = "";
  let lengthB = "";
  let lengthC = "";
  let lengthD = "";
  let lengthE = "";

  const makeChartData = (item) => {
    const a = item.filter((item) => {
      return item.service === "A서비스";
    });
    const b = item.filter((item) => {
      return item.service === "B서비스";
    });
    const c = item.filter((item) => {
      return item.service === "C서비스";
    });
    const d = item.filter((item) => {
      return item.service === "D서비스";
    });
    const e = item.filter((item) => {
      return item.service === "E서비스";
    });

    lengthA = a.length;
    lengthB = b.length;
    lengthC = c.length;
    lengthD = d.length;
    lengthE = e.length;

    setService({
      serviceA: lengthA,
      serviceB: lengthB,
      serviceC: lengthC,
      serviceD: lengthD,
      serviceE: lengthE,
    });
  };
  // makeChartData

  const tooltipStyle = {
    color: "#888888",
    background: "#fff",
    padding: "5px 10px",
    borderRadius: "3px",
    boxShadow: "var(--box-shadow-chart-tooltip)",
    textAlign: "center",
  };

  return (
    <div className="NtwActiveService">
      <Link to="/service">
        <div className="Dashboard_title">서비스별 네트워크 활동비율</div>
        <div className="Dashboard_chart">
          <ResponsivePie
            data={[
              { id: "A서비스", value: service.serviceA },
              { id: "B서비스", value: service.serviceB },
              { id: "C서비스", value: service.serviceC },
              { id: "D서비스", value: service.serviceD },
              { id: "E서비스", value: service.serviceE },
            ]}
            margin={{ top: 25, right: 0, bottom: 25, left: 0 }} //차트 margin
            innerRadius={0} //차트 중앙 빈공간 반지름
            colors={["#8fdbf4", "#80baf4 ", " #2ba0e3", " #055ca2", "#008FFB"]}
            arcLinkLabelsTextColor={darkmode ? "#fafbff" : "#3d3d3d"} //막대선에 이어진 label색상
            activeOuterRadiusOffset={10}
            enableArcLinkLabels={true} //막대선 표출 여부
            arcLinkLabelsDiagonalLength={4} // 막대선 길이1
            arcLinkLabelsStraightLength={12} // 막대선 길이2
            arcLinkLabelsThickness={1} //막대선 두께
            padAngle={0} //각 pad의 간격
            cornerRadius={0} //각 pad의 radius
            borderWidth={0} //각 pad의 border
            arcLabelsTextColor={darkmode ? "#fafbff" : "#3d3d3d"} // pad 내부 색상
            arcLinkLabelsColor={{ from: "color" }} // 막대 색상, pad 색상에 따라감
            // pad에 표현되는 글씨
            tooltip={(data) => {
              return (
                <div style={tooltipStyle}>
                  <span
                    style={{
                      background: data.datum.color,
                      display: "inline-block",
                      padding: "6px",
                    }}
                  ></span>{" "}
                  {data.datum.id} : {data.datum.value}
                </div>
              );
            }}
          />
        </div>
      </Link>
    </div>
  );
};

export default NtwActiveService;
