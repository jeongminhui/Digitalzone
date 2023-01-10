import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Carousel = ({ blocknum, block, currentBlock }) => {
  // navigation 블록 상세 이동
  const [blocknumber, setBlocknumber] = useState(blocknum);
  const navigate = useNavigate();

  const carouselHandler = (blocknum, idx) => {
    setBlocknumber(blocknum);
    slideTo(idx);
  };

  useEffect(() => {
    navigate(`/block/${blocknumber}`);
  }, [blocknumber]);

  const [swiperRef, setSwiperRef] = useState(null);

  const slideTo = (index) => {
    swiperRef.slideTo(index);
  };

  return (
    <div>
      <Swiper
        onSwiper={setSwiperRef}
        slidesPerView={5}
        spaceBetween={30}
        loop={true}
        pagination={false}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
        centeredSlides={true}
        slidesOffsetBefore={50}
        initialSlide={currentBlock}
      >
        {block.map((item, idx) => (
          <SwiperSlide
            key={idx}
            onClick={() => {
              carouselHandler(item.blocknum, idx);
            }}
          >
            <h3>{item.blocknum}</h3>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
