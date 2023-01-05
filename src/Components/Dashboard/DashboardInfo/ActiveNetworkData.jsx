import React from "react";

const ActiveNetworkData = (props) => {
  const allNetwork = props.networkData.allNetwork;
  const activeNetwork = props.networkData.activeNetwork;

  return (
    <div className="ActiveNetworkData">
      <div>
        활성 네트워크 수 : {activeNetwork} / 전체 네트워크 수 : {allNetwork}
      </div>
    </div>
  );
};

export default ActiveNetworkData;
