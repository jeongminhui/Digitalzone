import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";

const AllServiceData = () => {
  const dashboard_serviceCollection = collection(db, "service");
  const [serviceDataSize, setServiceDataSize] = useState("");

  useEffect(() => {
    async function getService() {
      const serviceData = await getDocs(dashboard_serviceCollection);
      return setServiceDataSize(serviceData.docs.length);
    }
    getService();
  }, [dashboard_serviceCollection]);

  return (
    <div className="AllServiceData">
      <div>전체 서비스 등록 건수 : {serviceDataSize}</div>
    </div>
  );
};

export default AllServiceData;
