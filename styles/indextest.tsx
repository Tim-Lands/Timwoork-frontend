import CategoriesSlider from "@/components/NewIndex/CategoriesSlider";
import Hero from "@/components/NewIndex/Header/Hero";
import VideoAside from "@/components/NewIndex/VideoSection/VideoAside";
import Head from "next/head";
import React, { ReactElement } from "react";
import useSWR from "swr";
import router from "next/router";
import Categories from "@/components/Categories";
import LayoutHome from "@/components/NewIndex/Layout/LayoutHome";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import PostInner from "@/components/Post/PostInner";
function index() {
  const { data: categories }: any = useSWR(`api/get_categories`);
  const catData = [
    {
      id: 1,
      thumbnail: "/avatar.png",
      name: "التصميم الغرافيكي",
      slug: "وصف التصنيف الرئيسي",
    },
    {
      id: 2,
      thumbnail: "/avatar.png",
      name: "التصميم الغرافيكي",
      slug: "وصف التصنيف الرئيسي",
    },
    {
      id: 3,
      thumbnail: "/avatar.png",
      name: "التصميم الغرافيكي",
      slug: "وصف التصنيف الرئيسي",
    },
    {
      id: 4,
      thumbnail: "/avatar.png",
      name: "التصميم الغرافيكي",
      slug: "وصف التصنيف الرئيسي",
    },
    {
      id: 5,
      thumbnail: "/avatar.png",
      name: "التصميم الغرافيكي",
      slug: "وصف التصنيف الرئيسي",
    },
  ];

  const { data: productsCarousel }: any = useSWR(
    "api/filter?paginate=9&sort=count_buying,desc"
  );
  return (
    <>
      <Head>
        <title>تيم ورك | لبيع وشراء الخدمات المصغرة</title>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@timwoorkDotCom" />
        <meta name="twitter:creator" content="@timwoorkDotCom" />
        <meta property="og:site_name" content="موقع تيم ورك" />
        <meta property="og:locale" content="ar" />
        <meta property="og:locale:alternate" content="ar" />
        <meta property="og:type" content="website" />
        <meta
          name="twitter:title"
          content={"تيم ورك | لبيع وشراء الخدمات المصغرة"}
        />
        <meta
          name="twitter:description"
          content={
            "بعض أجزاء الموقع لا تفتح إلا للأعضاء المشتركين المسجلين بعد تقديم بعض المعلومات الشخصية عنهم. يوافق المشترك عند تسجيله في الموقع بأن المعلومات المدخلة من طرفه هي كاملة ودقيقة، ويلتزم بأنه لن يقوم بالتسجيل في الموقع أو يحاول دخوله منتحلاً اسم مشترك آخر ولن يستخدم اسماً قد ترى الإدارة أنه غير مناسب، مثل أرقام الهواتف، والأسماء المنتحلة لشخصيات شهيرة، وروابط المواقع، والأسماء غير المفهومة، وما في حكمها. كذلك يلتزم بعدم تسجيل أكثر من حساب واحد في موقع تيموورك وعند استخدام نفس الشخص لأكثر من حساب فإنه يعرض كافة حساباته للإيقاف بشكل نهائي. "
          }
        />
        <meta
          property="og:title"
          content="تيم ورك | لبيع وشراء الخدمات المصغرة"
        />
        <meta
          property="og:description"
          content="بعض أجزاء الموقع لا تفتح إلا للأعضاء المشتركين المسجلين بعد تقديم بعض المعلومات الشخصية عنهم. يوافق المشترك عند تسجيله في الموقع بأن المعلومات المدخلة من طرفه هي كاملة ودقيقة، ويلتزم بأنه لن يقوم بالتسجيل في الموقع أو يحاول دخوله منتحلاً اسم مشترك آخر ولن يستخدم اسماً قد ترى الإدارة أنه غير مناسب، مثل أرقام الهواتف، والأسماء المنتحلة لشخصيات شهيرة، وروابط المواقع، والأسماء غير المفهومة، وما في حكمها. كذلك يلتزم بعدم تسجيل أكثر من حساب واحد في موقع تيموورك وعند استخدام نفس الشخص لأكثر من حساب فإنه يعرض كافة حساباته للإيقاف بشكل نهائي. "
        />
        <meta property="og:url" content="https://timwoork.com/" />
        <meta property="og:image" content="/seo.png" />
        <meta name="twitter:image:src" content="/seo.png" />
      </Head>

      <Hero />
      <div className="container">
        <CategoriesSlider
          data={catData}
          title="التصنيفات الأكثر شعبية"
          isLoading={false}
          showAll={"المزيد..."}
          link={"/test"}
        />
      </div>
      <VideoAside />
      <Categories
        onClickCategory={(id) => router.push(`/products?categoryID=${id}`)}
        categories={categories}
      />
      <div className="container-fluid">
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          pagination={{
            type: "progressbar",
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          breakpoints={{
            "@0.00": {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            "@0.75": {
              slidesPerView: 2,
              spaceBetween: 2,
            },
            "@1.00": {
              slidesPerView: 3,
              spaceBetween: 3,
            },
            "@1.50": {
              slidesPerView: 4,
              spaceBetween: 4,
            },
          }}
          className="mySwiper"
        >
          {productsCarousel &&
            productsCarousel.data.data.map((e: any) => (
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
                    e.profile_seller && e.profile_seller.profile.user.username
                  }
                  price={e.price}
                  slug={e.slug}
                  thumbnail={e.full_path_thumbnail}
                  buyers={e.count_buying}
                  avatar="/avatar2.jpg"
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  );
}
index.getLayout = function getLayout(page: any): ReactElement {
  return <LayoutHome>{page}</LayoutHome>;
};
export default index;
