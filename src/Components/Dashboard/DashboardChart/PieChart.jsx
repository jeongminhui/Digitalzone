import React from "react";
import { ResponsivePie } from "@nivo/pie";

const PieChart = (props) => {
  const service = props.serviceData.service;

  // status가 성공인 것을 추출
  const successService =
    service &&
    service.filter((item) => {
      return item.status === "성공";
    });

  // 성공인 데이터중 서비스이름을 추출
  const serviceName =
    successService &&
    successService.map((item) => {
      return item.service;
    });

  // 서비스 이름 중 중복이름 제거
  const set = new Set(serviceName);
  const uniqueServiceArr = [...set];

  ////////////////////////////////////////////

  const container_style = {
    width: "500px",
    height: "250px",
    border: "1px solid #999",
  };

  const style = {
    backgroundColor: "#ddd",
    width: "auto",
    height: "200px",
  };

  const data = [
    { id: "A서비스", value: 11 },
    { id: "B서비스", value: 25 },
    { id: "C서비스", value: 17 },
    { id: "D서비스", value: 34 },
    { id: "E서비스", value: 14 },
  ];

  return (
    <div className="PieChart" style={container_style}>
      <h4>서비스별 네트워크 활동비율</h4>
      <div style={style}>
        <ResponsivePie
          data={data}
          margin={{ top: 40, right: 40, bottom: 40, left: 40 }} //차트 margin
          innerRadius={0} //차트 중앙 빈공간 반지름
          padAngle={0} //각 pad의 간격
          cornerRadius={0} //각 pad의 radius
          colors={["#5f88df", "#80baf4", "#2ba0e3", "#6537c9", "#976df3"]} //차트색상
          // colors={{ scheme: "nivo" }} // nivo에서 제공해주는 색상 조합 사용할 때

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
    </div>
  );
};

export default PieChart;
