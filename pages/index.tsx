import Link from "next/link";
import Layout from '../components/Layout/HomeLayout'
import { ReactElement } from "react";
import Hero from "@/components/Hero";
import PostsAside from "@/components/PostsAside";
import useSWR from 'swr'
import { MetaTags } from '@/components/SEO/MetaTags'
import nannyIMG from '../public/nanny2.jpg'
import Image from 'next/image'
//import SupportEngine from '@/components/SupportChat/SupportEngine';
import Cookies from 'js-cookie'

function Home() {
  const { data: popularProducts, popularError }: any = useSWR('api/filter?paginate=4&popular')
  const { data: latestProducts, latestError }: any = useSWR('api/filter?paginate=4&sort[0]=created_at,desc')
  const { data: products, error }: any = useSWR('api/filter?paginate=4&sort=count_buying,desc')
  //*** set email in cookie ***/
  // const { data: userInfo }: any = useSWR('api/me')
  // const token = Cookies.get('token');
  //   if (token) { Cookies.set('username', userInfo && userInfo.user_details.email)}
    
  return (
    <>
      <MetaTags
        title={"تيموورك | لبيع وشراء الخدمات المصغرة "}
        metaDescription={"الصفحة الرئيسية"}
        ogDescription={"الصفحة الرئيسية"}
      />
      <Hero />
      <div className="timwoork-nanny-home">
        <div className="d-flex">
          <div className="nanny-home-image">
            <Image src={nannyIMG} placeholder="blur" />
          </div>

          <div className="nanny-home-content">
            <p className="new-label">ألهم الناس من حولك!</p>
            <h2 className="title">
            اعرض خدماتك واشتري أخرى, ماذا تنتظر !</h2>
            <p className="text">
            من شرفة منزلك لا تحتاج الخروج من بيتك للعمل, في تيموورك العمل يأتي أليك</p>
            <div className="py-3">
              <Link href="/add-new">
                <a className="btn butt-green butt-md">أنشئ خدمتك الآن</a>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {products && popularProducts && latestProducts &&
        <div className="container">
          <PostsAside
            title="الخدمات الأكثر شعبية "
            PostData={popularProducts && popularProducts.data.data}
            isLoading={!popularProducts}
            isError={popularError}
          />
          <PostsAside
            title="الخدمات التي أضيفت حديثا"
            PostData={latestProducts && latestProducts.data.data}
            isLoading={!latestProducts}
            isError={latestError}
          />
          <PostsAside
            title="الخدمات الأكثر مبيعا"
            PostData={products && products.data.data}
            isLoading={!products}
            isError={error}
          />
        </div>
      }
    </>
  );
}
Home.getLayout = function getLayout(page: any): ReactElement {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
export default Home