import React from "react";
import "./Transaction.scss";
import Footer from "../Footer/Footer";
import TranMain from "./TranMain/TranMain";


const Transaction = () => {

  return (
    <div className="Transaction">
      <TranMain/>
      {/* <TranInfo /> */}
      <Footer />
    </div>
  );
};

export default Transaction;
