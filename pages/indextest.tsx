import CategoriesSlider from '@/components/NewIndex/CategoriesSlider'
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
import PostsAside from '@/components/PostsAside'

function index({ products, latestProducts, categories, popularProducts, productsCarousel }) {

  console.log(productsCarousel)
  const catData = [
    {
      id: 1,
      thumbnail: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741678/logo-design-2x.png',
      name: 'التصميم الغرافيكي',
      slug: "وصف التصنيف الرئيسي"
    },
    {
      id: 2,
      thumbnail: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/ae11e2d45410b0eded7fba0e46b09dbd-1598561917003/wordpress-2x.png',
      name: 'التصميم الغرافيكي',
      slug: "وصف التصنيف الرئيسي"
    },
    {
      id: 3,
      thumbnail: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741664/data-entry-2x.png',
      name: 'التصميم الغرافيكي',
      slug: "وصف التصنيف الرئيسي"
    },
    {
      id: 4,
      thumbnail: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741664/illustration-2x.png',
      name: 'التصميم الغرافيكي',
      slug: "وصف التصنيف الرئيسي"
    },
    {
      id: 5,
      thumbnail: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741668/seo-2x.png',
      name: 'التصميم الغرافيكي',
      slug: "وصف التصنيف الرئيسي"
    },
    {
      id: 6,
      thumbnail: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741678/book-covers-2x.png',
      name: 'التصميم الغرافيكي',
      slug: "وصف التصنيف الرئيسي"
    },
    {
      id: 7,
      thumbnail: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741663/animated-explainer-2x.png',
      name: 'التصميم الغرافيكي',
      slug: "وصف التصنيف الرئيسي"
    },
  ]


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
      <div className='container'>
        <CategoriesSlider data={catData} title='التصنيفات الأكثر شعبية' isLoading={false} showAll={'المزيد...'} link={'/test'} />
      </div>
      <VideoAside />

      <Categories
        onClickCategory={(id) => router.push(`/products?categoryID=${id}`)}
        href={`/products?categoryID=`}
        categories={categories}
      />
      <div className='container'>

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
          {productsCarousel && productsCarousel.data.map((e: any) => (
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
      {products &&
        popularProducts &&
        latestProducts &&
        products.length !== 0 &&
        popularProducts.length !== 0 &&
        latestProducts.length !== 0 && (
          <div className="container">
            <PostsAside
              title="الخدمات الأكثر شعبية "
              PostData={popularProducts && popularProducts.data}
              linkURL="/products?type=popular"
            />
            <PostsAside
              title="الخدمات التي أضيفت حديثا"
              PostData={latestProducts && latestProducts.data}
              linkURL="/products?type=most_recent"
            />
            <PostsAside
              title="الخدمات الأكثر مبيعا"
              PostData={products && products.data}
              linkURL="/products?type=most_selling"
            />
          </div>
        )}
    </>
  )
}
index.getLayout = function getLayout(page: any): ReactElement {
  return <LayoutHome>{page}</LayoutHome>;
};
export async function getServerSideProps() {
  try {
    const [categories, popularProducts, latestProducts, productsCarousel, products] =
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
        productsCarousel: productsCarousel?.data?.data,
        categories: categories?.data,
        errorFetch: false
      }
    }

  } catch (error) {
    return { props: { errorFetch: true } }
  }
}
export default index