import Layout from "../components/Layout/HomeLayout";
import { ReactElement } from "react";
import Hero from "@/components/Hero";
import PostsAside from "@/components/PostsAside";
import useSWR from "swr";
import { Menu, Dropdown, Button, Alert } from "antd";
import Categories from "@/components/Categories";
import router from "next/router";
import Head from "next/head";
import { PRIMARY } from "../styles/variables";
import Link from "next/link";
function Home() {
  const { data: userInfo }: any = useSWR("api/me");
  const { data: popularProducts, popularError }: any = useSWR(
    "api/filter?paginate=9&popular"
  );
  const { data: latestProducts, latestError }: any = useSWR(
    "api/filter?paginate=9&sort[0]=created_at,desc"
  );
  const { data: products, error }: any = useSWR(
    "api/filter?paginate=9&sort=count_buying,desc"
  );
  const { data: categories }: any = useSWR(`api/get_categories`);

  const menu = (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://wa.me/+905519951407"
        >
          <i className="fab fa-whatsapp fa-fw"></i>
          واتساب
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://t.me/timwoorkDotCom"
        >
          <i className="fab fa-telegram fa-fw"></i>
          تيليجرام
        </a>
      </Menu.Item>
    </Menu>
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
      {!userInfo?.user_details?.phone && userInfo && (
        <Link href="/user/personalInformations">
          <Alert
            message="برجاء اضافة رقم الهاتف"
            type="error"
            style={{
              position: "absolute",
              top: 50,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 100,
            }}
          />
        </Link>
      )}
      <Hero />
      {/* <Swiper
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
        {productsCarousel && productsCarousel.data.data.map((e: any) => (
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
      </Swiper> */}
      <Categories
        href={`/products?categoryID=`}
        onClickCategory={(id) => {
          console.log(`/products?categoryID=${id}`)
          router.push(`/products?categoryID=${id}`)
        }}
        categories={categories}
      />

      {products &&
        popularProducts &&
        latestProducts &&
        products.data.length !== 0 &&
        popularProducts.data.length !== 0 &&
        latestProducts.data.length !== 0 && (
          <div className="container">
            <PostsAside
              title="الخدمات الأكثر شعبية "
              PostData={popularProducts && popularProducts.data.data}
              isError={popularError}
              linkURL="/products?type=popular"
            />
            <PostsAside
              title="الخدمات التي أضيفت حديثا"
              PostData={latestProducts && latestProducts.data.data}
              isError={latestError}
              linkURL="/products?type=most_recent"
            />
            <PostsAside
              title="الخدمات الأكثر مبيعا"
              PostData={products && products.data.data}
              isError={error}
              linkURL="/products?type=most_selling"
            />
          </div>
        )}
      <div
        className="shadow"
        style={{
          position: "fixed",
          bottom: "2rem",
          left: "2rem",
          borderRadius: "50%",
          zIndex: 9999,
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

Home.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export default Home;
