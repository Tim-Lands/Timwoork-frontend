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
import Link from 'next/link';

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
                        <div className="timlands-hero-img hero-red" style={{ backgroundImage: `url('/img/1.png')` }}>
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
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="timlands-hero-img hero-green" style={{ backgroundImage: `url('/img/2.png')` }}>
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
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="timlands-hero-img hero-dark" style={{ backgroundImage: `url('/img/3.png')` }}>
                            <Link href={`/`}>
                                <a className="timlands-hero-text">
                                    <h4 className="rating">
                                        <span className="material-icons">star</span>
                                        <span className="material-icons">star</span>
                                        <span className="material-icons">star</span>
                                        <span className="material-icons">star</span>
                                        <span className="material-icons material-icons-outlined">star</span>
                                    </h4>
                                    <h4 className="text">
                                        فوزي, <strong>صوتبات</strong>
                                    </h4>
                                </a>
                            </Link>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="timlands-hero-img hero-dark" style={{ backgroundImage: `url('/img/4.png')` }}>
                            <Link href={`/`}>
                                <a className="timlands-hero-text">
                                    <h4 className="rating">
                                        <span className="material-icons">star</span>
                                        <span className="material-icons">star</span>
                                        <span className="material-icons">star</span>
                                        <span className="material-icons">star</span>
                                        <span className="material-icons material-icons-outlined">star</span>
                                    </h4>
                                    <h4 className="text">
                                        فوزي, <strong>صوتبات</strong>
                                    </h4>
                                </a>
                            </Link>
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