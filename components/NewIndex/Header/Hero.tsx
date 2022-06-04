import React from 'react'

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, EffectFade, Autoplay } from "swiper";
// Import Swiper styles
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import HeroContent from './HeroContent';

function Hero() {
    return (
        <div className='timland-hero'>
            <div className="timlands-hero-carousel">
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade, Autoplay]}
                    spaceBetween={0}
                    slidesPerView={1}
                    effect='fade'
                    navigation={false}
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('slide change')}
                    autoplay
                    loop
                >
                    <SwiperSlide>
    
                        <div className="timlands-hero-img hero-red">
                            <img src='/img/001.png' />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="timlands-hero-img hero-green">
                            <img src='/img/002.png' />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="timlands-hero-img hero-dark">
                            <img src='/img/003.png' />
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className="timlands-here-content">
                <HeroContent />
            </div>
        </div>
    )
}

export default Hero