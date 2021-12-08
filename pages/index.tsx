import Link from "next/link";
import Layout from '../components/Layout/HomeLayout'
import { ReactElement } from "react";
import Hero from "@/components/Hero";
import PostsAside from "@/components/PostsAside";
import useSWR from 'swr'
import { MetaTags } from '@/components/SEO/MetaTags'

import nannyIMG from '../public/nanny.png'
import Image from 'next/image'
const testServices = [
  {
    id: 1,
    title: 'إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد',
    author: 'رقية الرفوع',
    rate: 4,
    price: 40,
    postUrl: '/Single',
    thumbnail: '/homepage.jpg',
    period: 9,
    buyers: 5,
    userUrl: '/user'
  },
  {
    id: 2,
    title: 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس',
    author: 'حاتم المصري',
    rate: 0,
    price: 36,
    postUrl: '/Single',
    thumbnail: '/photographer.jpg',
    period: 5,
    buyers: 0,
    userUrl: '/user'
  },
  {
    id: 3,
    title: 'لقد تم توليد هذا النص من مولد النص',
    author: 'حسام السوري',
    rate: 3,
    price: 40,
    postUrl: '/Single',
    thumbnail: '/homepage.jpg',
    period: 9,
    buyers: 5,
    userUrl: '/user'
  },
  {
    id: 4,
    title: 'ومن هنا وجب على المصمم أن يضع نصوصا مؤقتة',
    author: 'طارق عروي',
    rate: 1,
    price: 36,
    postUrl: '/Single',
    thumbnail: '/photographer.jpg',
    period: 5,
    buyers: 0,
    userUrl: '/user'
  },
]

function Home() {
  const { data: products, error }: any = useSWR('api/filter?duration=42')
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

      <div className="container">
        <PostsAside title="الفيدهات والحركات" PostData={testServices} isLoading={!products} isError={error}  />
        <PostsAside title="برمجة وتطوير" PostData={testServices} isLoading={!products} isError={error} />
        <PostsAside title="التصميم الغرافيكي" PostData={testServices} isLoading={!products} isError={error} />
      </div>

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