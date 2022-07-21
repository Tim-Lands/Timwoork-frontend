import React, { useState, useContext } from "react";
import { LanguageContext } from "../../../contexts/languageContext/context";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
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
  const { language, getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage("all");
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
      <div
        className={`timlands-hero-carousel ${language !== "ar" ? "en" : ""}`}
        style={{ direction: "rtl" }}
      >
        <Swiper
          modules={[
            Navigation,
            Pagination,
            // Scrollbar,
            // A11y,
            // EffectCreative,
            Autoplay,
          ]}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          spaceBetween={15}
          slidesPerView={1}
          effect="creative"
          navigation={false}
          pagination={{ clickable: true }}
          // scrollbar={{ draggable: true }}
          onSlideChange={(i) => setIndex(i.activeIndex)}
          loop
          style={{ maxHeight: 700, height: "100%", direction: "rtl" }}
        >
          <SwiperSlide>
            <div className="timlands-hero-img " style={{ direction: "rtl" }}>
              <img
                src="/img/1.png"
                alt=""
                // className="scale-ltr"
                // style={{ opacity: index === 1 ? 1 : 0, height: 500 }}
              />
            </div>
            <Link href={`/`}>
              <a className="timlands-hero-text">
                <h4 className="rating">
                  <span className="material-icons">star</span>
                  <span className="material-icons">star</span>
                  <span className="material-icons">star</span>
                  <span className="material-icons">star</span>
                  <span className="material-icons">star</span>
                </h4>
                <h4 className="text"></h4>
                {getAll("Hussam_voiceover_agent")}
              </a>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <div className="timlands-hero-img " style={{ direction: "rtl" }}>
              <img
                src="/img/2.png"
                alt=""
                // className="scale-ltr"
                // style={{ opacity: index === 2 ? 1 : 0, height: 500 }}
              />
            </div>
            <Link href={`/`}>
              <a className="timlands-hero-text">
                <h4 className="rating">
                  <span className="material-icons">star</span>
                  <span className="material-icons">star</span>
                  <span className="material-icons">star</span>
                  <span className="material-icons">star</span>
                  <span className="material-icons">star</span>
                </h4>
                <h4 className="text">{getAll("Ayat_voiceover_agent")}</h4>
              </a>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <div className="timlands-hero-img " style={{ direction: "rtl" }}>
              <img
                src="/img/3.png"
                alt=""
                // className="scale-ltr"
                // style={{ opacity: index === 3 ? 1 : 0, height: 500 }}
              />
            </div>
            <Link href={`/`}>
              <a className="timlands-hero-text">
                <h4 className="rating">
                  {" "}
                  <span className="material-icons">star</span>
                  <span className="material-icons">star</span>
                  <span className="material-icons">star</span>
                  <span className="material-icons">star</span>
                  <span className="material-icons">star</span>
                </h4>
                <h4 className="text">{getAll("Faouzi_Audios")}</h4>
              </a>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <div className="timlands-hero-img " style={{ direction: "rtl" }}>
              <img
                src="/img/4.png"
                alt=""
                // className="scale-ltr"
                // style={{ opacity: index === 4 ? 1 : 0, height: 500 }}
              />
            </div>
            <Link href={`/`}>
              <a className="timlands-hero-text">
                <h4 className="rating">
                  {" "}
                  <span className="material-icons">star</span>
                  <span className="material-icons">star</span>
                  <span className="material-icons">star</span>
                  <span className="material-icons">star</span>
                  <span className="material-icons">star</span>
                </h4>
                <h4 className="text">{getAll("Rahma_writing_and")}</h4>
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
      return "hero-orange";
    case 1:
      return "hero-green";
    case 2:
      return "hero-pink";
    case 3:
      return "hero-red";
    case 4:
      return "hero-orange";
    case 5:
      return "hero-green";
  }
}
export default Hero;
