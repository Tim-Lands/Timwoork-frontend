import React, { useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCreative,
  Autoplay,
} from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import HeroContent from "./HeroContent";
import Link from "next/link";

function Hero() {
  const [index, setIndex] = useState(1);
  return (
    <div
      className="timland-hero d-flex align-items-center justify-content-center"
      style={{
        maxHeight: 700,
        backgroundColor: whichColor(index),
        transition: "all .3s linear",
      }}
    >
      <div className="timlands-hero-carousel" style={{ maxWidth: 1400 }}>
        <Swiper
          modules={[
            Navigation,
            Pagination,
            Scrollbar,
            A11y,
            EffectCreative,
            Autoplay,
          ]}
          spaceBetween={0}
          slidesPerView={1}
          effect="creative"
          navigation={false}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSlideChange={(i) => setIndex(i.activeIndex)}
          autoplay
          loop
          style={{ maxHeight: 700, height: "100%" }}
        >
          <SwiperSlide>
            <div
              className="timlands-hero-img hero-red"
              style={{
                backgroundImage: `url('/img/1.png')`,
              }}
            ></div>
            <Link href={`/`}>
              <a className="timlands-hero-text">
                <h4 className="rating">
                  <span className="material-icons">star</span>
                  <span className="material-icons">star</span>
                  <span className="material-icons">star</span>
                  <span className="material-icons">star</span>
                  <span className="material-icons">star</span>
                </h4>
                <h4 className="text">
                  رحمة, <strong>كتابة وترجمة</strong>
                </h4>
              </a>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="timlands-hero-img hero-green"
              style={{
                backgroundImage: `url('/img/2.png')`,
              }}
            ></div>
            <Link href={`/`}>
              <a className="timlands-hero-text">
                <h4 className="rating">
                  <span className="material-icons">star</span>
                  <span className="material-icons">star</span>
                  <span className="material-icons">star</span>
                  <span className="material-icons">star</span>
                  <span className="material-icons">star</span>
                </h4>
                <h4 className="text">
                  فوزي, <strong>صوتبات</strong>
                </h4>
              </a>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="timlands-hero-img hero-dark"
              style={{
                backgroundImage: `url('/img/3.png')`,
              }}
            ></div>
            <Link href={`/`}>
              <a className="timlands-hero-text">
                <h4 className="rating">
                  <span className="material-icons">star</span>
                  <span className="material-icons">star</span>
                  <span className="material-icons">star</span>
                  <span className="material-icons">star</span>
                  <span className="material-icons material-icons-outlined">
                    star
                  </span>
                </h4>
                <h4 className="text">
                  فوزي, <strong>صوتبات</strong>
                </h4>
              </a>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="timlands-hero-img hero-dark"
              style={{
                backgroundImage: `url('/img/4.png')`,
              }}
            ></div>
            <Link href={`/`}>
              <a className="timlands-hero-text">
                <h4 className="rating">
                  <span className="material-icons">star</span>
                  <span className="material-icons">star</span>
                  <span className="material-icons">star</span>
                  <span className="material-icons">star</span>
                  <span className="material-icons material-icons-outlined">
                    star
                  </span>
                </h4>
                <h4 className="text">
                  فوزي, <strong>صوتبات</strong>
                </h4>
              </a>
            </Link>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="timlands-here-content">
        <HeroContent />
      </div>
    </div>
  );
}
function whichColor(num) {
  switch (num) {
    default:
      return "transparent";
    case 0:
      return "#dc6d08";
    case 1:
      return "#023813";
    case 2:
      return "#822921";
    case 3:
      return "#b3455e";
    case 4:
      return "#dc6d08";
    case 5:
      return "#023813";
  }
}
export default Hero;
