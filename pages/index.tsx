import { Menu, Dropdown, Button } from "antd";
import { PRIMARY } from "../styles/variables";
import Hero from "@/components/NewIndex/Header/Hero";
import VideoAside from "@/components/NewIndex/VideoSection/VideoAside";
import Head from "next/head";
import React, { ReactElement, useContext } from "react";
import { LanguageContext } from "../contexts/languageContext/context";
import Link from "next/link";
import router from "next/router";
import Categories from "@/components/Categories";
import LayoutHome from "@/components/NewIndex/Layout/LayoutHome";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import API from "../config";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import PostInner from "@/components/Post/PostInner";
function index({ products, latestProducts, categories, popularProducts }) {
  const { language, getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage();
  const menu = (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://wa.me/+905519951407"
        >
          <i className="fab fa-whatsapp fa-fw"></i>
          {getAll("WhatsApp")}
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://t.me/timwoorkDotCom"
        >
          <i className="fab fa-telegram fa-fw"></i>
          {getAll("Telegram")}
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <Head>
        <title>{getAll("Timwoork_l_For")}</title>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@timwoorkDotCom" />
        <meta name="twitter:creator" content="@timwoorkDotCom" />
        <meta property="og:site_name" content={getAll("Timwoork_website")} />
        <meta property="og:locale" content="ar" />
        <meta property="og:locale:alternate" content="ar" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content={getAll("Timwoork_l_For")} />
        <meta
          name="twitter:description"
          content={getAll("Timwoork’s_website")}
        />
        <meta property="og:title" content={getAll("Timwoork_l_For")} />
        <meta
          property="og:description"
          content={getAll("Timwoork’s_website")}
        />
        <meta property="og:url" content="https://timwoork.com/" />
        <meta property="og:image" content="/seo.png" />
        <meta name="twitter:image:src" content="/seo.png" />
      </Head>
      <Hero />
      <VideoAside />

      <Categories
        onClickCategory={(id) => router.push(`/products?categoryID=${id}`)}
        href={`/products?categoryID=`}
        categories={categories}
      />
      {products &&
        popularProducts &&
        latestProducts &&
        products.length !== 0 &&
        popularProducts.length !== 0 &&
        latestProducts.length !== 0 && (
          <>
            <div
              className="container "
              style={{ direction: language === "ar" ? "rtl" : "ltr" }}
            >
              <div
                className="d-flex align-items-center justify-content-between mb-5 mt-5 index-product-header w-100"
                style={{ direction: language === "ar" ? "rtl" : "ltr" }}
              >
                <h6 className="title   fw-bold" style={{ fontSize: 19 }}>
                  {getAll("Newly_added_services")}
                </h6>
                <Link href="/products/latest">
                  <button>{getAll("More")}</button>
                </Link>
              </div>

              <Swiper
                pagination={{
                  type: "progressbar",
                }}
                // dir={language === "ar" ? "rtl" : "ltr"}
                navigation={true}
                modules={[Pagination, Navigation]}
                breakpoints={{
                  1000: {
                    slidesPerView: 4,
                    spaceBetween: 15,
                  },
                  770: {
                    slidesPerView: 3,
                    spaceBetween: 15,
                  },
                  600: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                  },
                  100: {
                    slidesPerView: 1,
                    spaceBetween: 15,
                  },
                }}
                className="mySwiper"
                style={{ direction: "rtl" }}
                dir={"rtl"}
              >
                {latestProducts &&
                  latestProducts.data.map((e: any) => {
                    console.log(e);

                    return (
                      <SwiperSlide key={e.id}>
                        <PostInner
                          title={e.title}
                          author={
                            e.profile_seller &&
                            e.profile_seller.profile.first_name +
                              " " +
                              e.profile_seller.profile.last_name
                          }
                          rate={e.ratings_avg_rating}
                          username={
                            e.profile_seller &&
                            e.profile_seller.profile.user.username
                          }
                          price={e.price}
                          slug={e.slug}
                          thumbnail={e.full_path_thumbnail}
                          buyers={e.count_buying}
                          avatar={e.profile_seller.profile.avatar_path}
                        />
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
            <div
              className="container "
              style={{ marginBlock: 90, direction: "rtl" }}
            >
              <div
                className="d-flex align-items-center justify-content-between mb-5 mt-5 index-product-header w-100"
                style={{ direction: language === "ar" ? "rtl" : "ltr" }}
              >
                <h6 className="title   fw-bold" style={{ fontSize: 19 }}>
                  {getAll("Top_selling_services")}
                </h6>
                <Link href="/products/best-seller">
                  <button>{getAll("More")}</button>
                </Link>
              </div>
              <Swiper
                pagination={{
                  type: "progressbar",
                }}
                // dir={language === "en" ? "ltr" : "rtl"}
                navigation={true}
                modules={[Pagination, Navigation]}
                breakpoints={{
                  1000: {
                    slidesPerView: 4,
                    spaceBetween: 15,
                  },
                  770: {
                    slidesPerView: 3,
                    spaceBetween: 15,
                  },
                  600: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                  },
                  100: {
                    slidesPerView: 1,
                    spaceBetween: 15,
                  },
                }}
                className="mySwiper"
                dir={"rtl"}
                style={{ direction: "rtl" }}
              >
                {products &&
                  products.data.map((e: any) => (
                    <SwiperSlide key={e.id}>
                      <PostInner
                        title={e.title}
                        author={
                          e.profile_seller &&
                          e.profile_seller.profile.first_name +
                            " " +
                            e.profile_seller.profile.last_name
                        }
                        rate={e.ratings_avg_rating}
                        username={
                          e.profile_seller &&
                          e.profile_seller.profile.user.username
                        }
                        price={e.price}
                        slug={e.slug}
                        thumbnail={e.full_path_thumbnail}
                        buyers={e.count_buying}
                        avatar={e.profile_seller.profile.avatar_path}
                      />
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
            <div className="container " style={{ direction: "rtl" }}>
              <div
                className="d-flex align-items-center justify-content-between mb-5 mt-5 index-product-header w-100"
                style={{ direction: language === "ar" ? "rtl" : "ltr" }}
              >
                <h6 className="title   fw-bold" style={{ fontSize: 19 }}>
                  {getAll("Most_popular_services")}
                </h6>
                <button>
                  <Link href="/products/popular">{getAll("More")}</Link>
                </button>
              </div>
              <Swiper
                // dir={language === "ar" ? "rtl" : ""}
                pagination={{
                  type: "progressbar",
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                breakpoints={{
                  1000: {
                    slidesPerView: 4,
                    spaceBetween: 15,
                  },
                  770: {
                    slidesPerView: 3,
                    spaceBetween: 15,
                  },
                  600: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                  },
                  100: {
                    slidesPerView: 1,
                    spaceBetween: 15,
                  },
                }}
                style={{ direction: "rtl" }}
                dir={"rtl"}
                className="mySwiper "
              >
                {popularProducts &&
                  popularProducts.data.map((e: any) => (
                    <SwiperSlide key={e.id}>
                      <PostInner
                        title={e.title}
                        author={
                          e.profile_seller &&
                          e.profile_seller.profile.first_name +
                            " " +
                            e.profile_seller.profile.last_name
                        }
                        rate={e.ratings_avg_rating}
                        username={
                          e.profile_seller &&
                          e.profile_seller.profile.user.username
                        }
                        price={e.price}
                        slug={e.slug}
                        thumbnail={e.full_path_thumbnail}
                        buyers={e.count_buying}
                        avatar={e.profile_seller.profile.avatar_path}
                      />
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </>
        )}
      <div
        className="shadow"
        style={{
          position: "fixed",
          bottom: "2rem",
          borderRadius: "50%",
          zIndex: 999,
        }}
      >
        <Dropdown overlay={menu} placement="topCenter" arrow>
          <Button
            style={{
              width: "75px",
              height: "75px",
              borderRadius: "50%",
              padding: "0",
              color: PRIMARY,
              borderColor: PRIMARY,
            }}
          >
            <i className="fa fa-comments fa-3x"></i>
          </Button>
        </Dropdown>
      </div>
    </>
  );
}
index.getLayout = function getLayout(page: any): ReactElement {
  return <LayoutHome dark={true}>{page}</LayoutHome>;
};
export async function getServerSideProps() {
  try {
    const [categories, popularProducts, latestProducts, products] =
      await Promise.all([
        API.get("api/get_categories"),
        API.get("api/filter?paginate=9&popular"),
        API.get("api/filter?paginate=9&sort[0]=created_at,desc"),
        API.get("api/filter?paginate=9&sort=count_buying,desc"),
      ]);

    // Pass data to the page via props
    return {
      props: {
        products: products?.data?.data,
        popularProducts: popularProducts?.data?.data,
        latestProducts: latestProducts?.data?.data,
        categories: categories?.data,
        errorFetch: false,
      },
    };
  } catch (error) {
    return { props: { errorFetch: true } };
  }
}
export default index;
