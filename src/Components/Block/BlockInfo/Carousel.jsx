import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { async } from "@firebase/util";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../../../firebase";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Carousel = ({ blocknum, blockInfo, onAddData }) => {
  const blockCollection = collection(db, "block");
  const [block, setBlock] = useState([]);

  useEffect(() => {
    async function getBlocks() {
      const data = await getDocs(blockCollection);
      const arr = data.docs.map((items) => {
        return items.data();
      });
      setBlock(arr);
    }
    getBlocks();
  }, []);

  // navigation 블록 상세 이동
  const [blocknumber, setBlocknumber] = useState(blocknum);
  const navigate = useNavigate();

  const clickHandler = (blocknum) => {
    setBlocknumber(blocknum);
    window.location.replace(`/block/${blocknum}`);
    onAddData(blocknum);
  };

  useEffect(() => {
    navigate(`/block/${blocknum}`);
  }, [blocknum]);

  console.log(blocknum);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div>
      <Slider {...settings}>
        {block.map((item, idx) => (
          <div key={idx} onClick={() => clickHandler(item.blocknum)}>
            <h3>{item.blocknum}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
