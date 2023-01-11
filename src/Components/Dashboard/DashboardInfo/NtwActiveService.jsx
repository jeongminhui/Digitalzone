import React, { useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import { Link } from "react-router-dom";

// recooil로 불러오기
import { useRecoilValue } from "recoil";
import { serviceSelector } from "../../../Recoil/Selector";

const NtwActiveService = () => {
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
            margin={{ top: 35, right: 0, bottom: 35, left: 0 }} //차트 margin
            innerRadius={0} //차트 중앙 빈공간 반지름
            padAngle={0} //각 pad의 간격
            cornerRadius={0} //각 pad의 radius
            colors={["#5f88df", "#80baf4", "#2ba0e3", "#6537c9", "#976df3"]} //차트색상
            borderWidth={0} //각 pad의 border
            enableArcLinkLabels={true} //막대선 표출 여부
            arcLinkLabelsTextColor="black" //막대선 label색상
            arcLinkLabelsThickness={2} //막대선 두께
            arcLinkLabelsColor={{ from: "color" }} // 막대 색상, pad 색상에 따라감
            // pad에 표현되는 글씨
            theme={{
              labels: {
                text: {
                  fontSize: 10,
                  fill: "#000000",
                },
              },
            }}
          />
        </div>
      </Link>
    </div>
  );
};

export default NtwActiveService;
