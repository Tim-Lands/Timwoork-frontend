import Hero from '@/components/NewIndex/Header/Hero'
import VideoAside from '@/components/NewIndex/VideoSection/VideoAside'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import router from "next/router";
import Categories from "@/components/Categories";
import LayoutHome from '@/components/NewIndex/Layout/LayoutHome'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import API from '../config'
// Import Swiper styles
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import PostInner from '@/components/Post/PostInner'

function index({ products, latestProducts, categories, popularProducts }) {


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

      <VideoAside />

      <Categories
        onClickCategory={(id) => router.push(`/products?categoryID=${id}`)}
        href={`/products?categoryID=`}
        categories={categories}
      />
      {
        products &&
        popularProducts &&
        latestProducts &&
        products.length !== 0 &&
        popularProducts.length !== 0 &&
        latestProducts.length !== 0 && (
          <>
            <div className='container'>
            <h1 className="title me-auto">الخدمات الأحدث</h1>
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
                {latestProducts && latestProducts.data.map((e: any) => (
                  <SwiperSlide key={e.id}>
                    <PostInner
                      title={e.title}
                      author={e.profile_seller && (e.profile_seller.profile.first_name + ' ' + e.profile_seller.profile.last_name)}
                      rate={e.ratings_avg_rating}
                      username={e.profile_seller && e.profile_seller.profile.user.username}
                      price={e.price}
                      slug={e.slug}
                      thumbnail={e.full_path_thumbnail}
                      buyers={e.count_buying}
                      avatar='/avatar2.jpg'
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className='container'>
            <h1 className="title me-auto">الخدمات الأكثر مبيعًا</h1>
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
                {products && products.data.map((e: any) => (
                  <SwiperSlide key={e.id}>
                    <PostInner
                      title={e.title}
                      author={e.profile_seller && (e.profile_seller.profile.first_name + ' ' + e.profile_seller.profile.last_name)}
                      rate={e.ratings_avg_rating}
                      username={e.profile_seller && e.profile_seller.profile.user.username}
                      price={e.price}
                      slug={e.slug}
                      thumbnail={e.full_path_thumbnail}
                      buyers={e.count_buying}
                      avatar='/avatar2.jpg'
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className='container'>
            <h1 className="title me-auto">الخدمات الأكثر شعبية</h1>
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
                {popularProducts && popularProducts.data.map((e: any) => (
                  <SwiperSlide key={e.id}>
                    <PostInner
                      title={e.title}
                      author={e.profile_seller && (e.profile_seller.profile.first_name + ' ' + e.profile_seller.profile.last_name)}
                      rate={e.ratings_avg_rating}
                      username={e.profile_seller && e.profile_seller.profile.user.username}
                      price={e.price}
                      slug={e.slug}
                      thumbnail={e.full_path_thumbnail}
                      buyers={e.count_buying}
                      avatar='/avatar2.jpg'
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </>)
      }
    </>
  )
}
index.getLayout = function getLayout(page: any): ReactElement {
  return <LayoutHome>{page}</LayoutHome>;
};
export async function getServerSideProps() {
  try {
    const [categories, popularProducts, latestProducts, products] =
      await Promise.all([
        API.get('api/get_categories'),
        API.get('api/filter?paginate=9&popular'),
        API.get('api/filter?paginate=9&sort[0]=created_at,desc'),
        API.get('api/filter?paginate=9&sort=count_buying,desc'),
        API.get('api/filter?paginate=9&sort=count_buying,desc'),

      ])

    // Pass data to the page via props
    return {
      props: {
        products: products?.data?.data,
        popularProducts: popularProducts?.data?.data,
        latestProducts: latestProducts?.data?.data,
        categories: categories?.data,
        errorFetch: false
      }
    }

  } catch (error) {
    return { props: { errorFetch: true } }
  }
}
export default index