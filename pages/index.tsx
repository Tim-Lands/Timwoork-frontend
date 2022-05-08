import Layout from "../components/Layout/HomeLayout";
import { ReactElement } from "react";
import Hero from "@/components/Hero";
import PostsAside from "@/components/PostsAside";
import useSWR from "swr";
import { Menu, Dropdown, Button } from "antd";
import Categories from "@/components/Categories";
import router from "next/router";
import Head from "next/head";
function Home() {
  const { data: popularProducts, popularError }: any = useSWR(
    "api/filter?paginate=4&popular"
  );
  const { data: latestProducts, latestError }: any = useSWR(
    "api/filter?paginate=4&sort[0]=created_at,desc"
  );
  const { data: products, error }: any = useSWR(
    "api/filter?paginate=4&sort=count_buying,desc"
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
      <Hero />
      <Categories
        onClickCategory={(id) => router.push(`/sub-category/${id}`)}
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
              linkURL="/products/popular"
            />
            <PostsAside
              title="الخدمات التي أضيفت حديثا"
              PostData={latestProducts && latestProducts.data.data}
              isError={latestError}
              linkURL="/products/latest"
            />
            <PostsAside
              title="الخدمات الأكثر مبيعا"
              PostData={products && products.data.data}
              isError={error}
              linkURL="/products/best-seller"
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
              color: "#475c80",
              borderColor: "#475c80",
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
