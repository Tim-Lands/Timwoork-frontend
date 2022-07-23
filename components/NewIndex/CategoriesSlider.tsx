import React, { ReactElement } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Category from "@/components/NewIndex/Category";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

interface Item {
  id: any;
  thumbnail: string;
  name: string;
  slug: string;
}
function CategoriesSlider({ data, title, showAll, link }): ReactElement {
  return (
    <div className="timlands-horizontale-list">
      <div className="timlands-horizontale-header">
        <h3 className="title">{title}</h3>
        {showAll && (
          <div className="aside-button">
            <Link href={link}>
              <a className="btn butt-sm butt-light">{showAll}</a>
            </Link>
          </div>
        )}
      </div>
      <div className="timlands-horizontale-body">
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          pagination={{
            type: "progressbar",
          }}
          navigation={true}
          modules={[Navigation]}
          breakpoints={{
            1400: {
              slidesPerView: 6,
              spaceBetween: 15,
            },
            1200: {
              slidesPerView: 5,
              spaceBetween: 15,
            },
            960: {
              slidesPerView: 4,
              spaceBetween: 15,
            },
            720: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            540: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            // "@0.00": {
            //   slidesPerView: 2,
            //   spaceBetween: 30,
            // },

            // "@1.50": {
            //   slidesPerView: 4,
            //   spaceBetween: 15,
            // },
            // // "@1.00": {
            // //   slidesPerView: 3,
            // //   spaceBetween: 3,
            // // },
            // // "@1.50": {
            // //   slidesPerView: 4,
            // //   spaceBetween: 15,
            // // },
          }}
          className="mySwiper"
        >
          {data &&
            data.map((item: Item) => (
              <SwiperSlide key={item.id}>
                <Category
                  thumbnail={item.thumbnail}
                  name={item.name}
                  slug={item.slug}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}

CategoriesSlider.propTypes = {
  data: PropTypes.array,
  title: PropTypes.string,
  showAll: PropTypes.string,
  link: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default CategoriesSlider;
