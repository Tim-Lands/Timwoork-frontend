import Link from "next/link";
import Layout from '../components/Layout/HomeLayout'
import { ReactElement } from "react";
import Hero from "@/components/Hero";
import PostsAside from "@/components/PostsAside";
import useSWR from 'swr'
import { MetaTags } from '@/components/SEO/MetaTags'
import nannyIMG from '../public/nanny2.jpg'
import Image from 'next/image'

function Home() {
  
  const { data: popularProducts, popularError }: any = useSWR('api/filter?paginate=4&popular')
  const { data: latestProducts, latestError }: any = useSWR('api/filter?paginate=4&sort[0]=created_at&sort[1]=id,desc')
  const { data: products, error }: any = useSWR('api/filter?paginate=4')
  return (
    <>
      <MetaTags
        title={"الصفحة الرئيسية"}
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
            <p className="new-label">هذا النص هو مثال لنص</p>
            <h2 className="title">
              هذا النص هو مثال لنص يمكن أن يستبدل في نفس
            </h2>
            <p className="text">
              هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف
            </p>
            <div className="py-3">
              <Link href="/">
                <a className="btn butt-green butt-md">أنشئي خدمتك الآن</a>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {products &&
        <div className="container">
          <PostsAside title="الأكثر شعبية" PostData={popularProducts && popularProducts.data.data} isLoading={!popularProducts} isError={popularError} />
          <PostsAside title="الخدمات التي أضيفت حديثا" PostData={latestProducts && latestProducts.data.data} isLoading={!latestProducts} isError={latestError} />
          <PostsAside title="الأكثر مبيعا" PostData={products && products.data.data} isLoading={!products} isError={error} />
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