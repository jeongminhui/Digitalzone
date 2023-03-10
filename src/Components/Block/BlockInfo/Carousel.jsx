import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// recoil로 불러오기
import { useRecoilState } from "recoil";
import { currentBlockAtom } from "../../../Recoil/Atom";
import { useRecoilValue } from "recoil";
import { currentBlockSelector } from "../../../Recoil/Selector";
import { ThemeContext } from "../../Context/ThemeContext";

const Carousel = ({ blocknum, block }) => {
  const current = useRecoilValue(currentBlockSelector);
  const [currentBlock, setCurrentBlock] = useRecoilState(currentBlockAtom);

  // 다크모드
  const darkmodeTheme = useContext(ThemeContext);
  const darkmode = darkmodeTheme.isDarkMode;

  // navigation 블록 상세 이동
  const [blocknumber, setBlocknumber] = useState(blocknum);
  const navigate = useNavigate();

  const carouselHandler = (blocknum, idx) => {
    setBlocknumber(blocknum);
    setCurrentBlock(idx);
    slideTo(idx);
  };

  useEffect(() => {
    navigate(`/block/${blocknumber}`);
  }, [blocknumber]);

  const [swiperRef, setSwiperRef] = useState(null);
  const [swiper, setSwiper] = useState();

  const slideTo = (current) => {
    swiper.slideTo(current + 5);
  };

  return (
    <div className="carousel">
      <Swiper
        onSwiper={(swiper) => setSwiper(swiper)}
        slidesPerView={5}
        spaceBetween={0}
        loop={true}
        pagination={false}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
        centeredSlides={true}
        slidesOffsetBefore={58}
        initialSlide={current}
      >
        {block.map((item, idx) => (
          <SwiperSlide
            key={idx}
            onClick={() => {
              carouselHandler(item.blocknum, idx);
            }}
            style={{
              color: darkmode ? "var(--bg-color)" : "var(--dark-grey-color)",
            }}
          >
            <h3>#{item.blocknum}</h3>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
