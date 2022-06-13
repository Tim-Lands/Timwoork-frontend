import React, { useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  // Scrollbar,
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
      className={
        "timland-hero d-flex align-items-center justify-content-center " +
        whichColor(index)
      }
      style={{
        maxHeight: 700,
        transition: "all .3s linear",
      }}
    >
      <div className="timlands-hero-carousel" style={{ maxWidth: 1400 }}>
        <Swiper
          modules={[
            Navigation,
            Pagination,
            // Scrollbar,
            A11y,
            EffectCreative,
            Autoplay,
          ]}
          spaceBetween={0}
          slidesPerView={1}
          effect="creative"
          navigation={false}
          pagination={{ clickable: true }}
          // scrollbar={{ draggable: true }}
          onSlideChange={(i) => setIndex(i.activeIndex)}
          autoplay
          loop
          style={{ maxHeight: 700, height: "100%" }}
        >
          <SwiperSlide>
            <div className="timlands-hero-img ">
              <img
                src="/img/1.png"
                alt=""
                style={{ opacity: index === 1 ? 1 : 0, height: 500 }}
              />
            </div>
            <Link href={`/`}>
              <a
                className="timlands-hero-text"
                style={{ opacity: index === 1 ? 1 : 0 }}
              >
                <h4 className="rating">
                  <span className="material-icons">star</span>
                  <span className="material-icons">star</span>
                  <span className="material-icons">star</span>
                  <span className="material-icons">star</span>
                  <span className="material-icons">star</span>
                </h4>
                <h4 className="text">
                  حسام, <strong>معلق صوتي</strong>
                </h4>
              </a>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <div className="timlands-hero-img ">
              <img
                src="/img/2.png"
                alt=""
                style={{ opacity: index === 2 ? 1 : 0, height: 500 }}
              />
            </div>
            <Link href={`/`}>
              <a
                className="timlands-hero-text"
                style={{ opacity: index === 2 ? 1 : 0 }}
              >
                <h4 className="rating">
                  <span className="material-icons">star</span>
                  <span className="material-icons">star</span>
                  <span className="material-icons">star</span>
                  <span className="material-icons">star</span>
                  <span className="material-icons">star</span>
                </h4>
                <h4 className="text">
                  أيات, <strong>معلق صوتي</strong>
                </h4>
              </a>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <div className="timlands-hero-img ">
              <img
                src="/img/3.png"
                alt=""
                style={{ opacity: index === 3 ? 1 : 0, height: 500 }}
              />
            </div>
            <Link href={`/`}>
              <a
                className="timlands-hero-text"
                style={{ opacity: index === 3 ? 1 : 0 }}
              >
                <h4 className="rating">
                  {" "}
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
            <div className="timlands-hero-img ">
              <img
                src="/img/4.png"
                alt=""
                style={{ opacity: index === 4 ? 1 : 0, height: 500 }}
              />
            </div>
            <Link href={`/`}>
              <a
                className="timlands-hero-text"
                style={{ opacity: index === 4 ? 1 : 0 }}
              >
                <h4 className="rating">
                  {" "}
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
    // case 0:
    //   return "hero-red";
    case 1:
      return "hero-green";
    case 2:
      return "hero-pink";
    case 3:
      return "hero-red";
    case 4:
      return "hero-orange";
    // case 5:
    //   return "hero-green";
  }
}
export default Hero;
