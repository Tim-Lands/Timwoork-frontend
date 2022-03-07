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
import { Menu, Dropdown, Button, Carousel } from 'antd';

function Home() {
  const { data: popularProducts, popularError }: any = useSWR('api/filter?paginate=4&popular')
  const { data: latestProducts, latestError }: any = useSWR('api/filter?paginate=4&sort[0]=created_at,desc')
  const { data: products, error }: any = useSWR('api/filter?paginate=4&sort=count_buying,desc')
  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://wa.me/+905365435281">
          <i className="fab fa-whatsapp fa-fw"></i>
          واتساب
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://t.me/TimWoork_customers_service">
          <i className="fab fa-telegram fa-fw"></i>
          تيليجرام
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <MetaTags
        title={"لبيع وشراء الخدمات المصغرة"}
        metaDescription={"الصفحة الرئيسية"}
        ogDescription={"الصفحة الرئيسية"}
      />
      <Hero />

      <div className="timwoork-nanny-home">
        <div className="d-flex">
          <div className="nanny-home-image">
            <Carousel autoplay style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              margin: 'auto',
              height: 400
            }}>

              <div className="images-slidshow">
                <div className="image-slider-item">
                  <Image src={'/15.png'} width={645} height={400} placeholder="blur" blurDataURL='/1.png' />
                </div>
              </div>
              <div className="images-slidshow">
                <div className="image-slider-item">
                  <Image src={'/2.png'} width={645} height={400} placeholder="blur" blurDataURL='/2.png' />
                </div>
              </div>
              <div className="images-slidshow">
                <div className="image-slider-item">
                  <Image src={'/3.png'} width={645} height={400} placeholder="blur" blurDataURL='/3.png' />
                </div>
              </div>
              <div className="images-slidshow">
                <div className="image-slider-item">
                  <Image src={'/4.png'} width={645} height={400} placeholder="blur" blurDataURL='/4.png' />
                </div>
              </div>
              <div className="images-slidshow">
                <div className="image-slider-item">
                  <Image src={'/5.png'} width={645} height={400} placeholder="blur" blurDataURL='/4.png' />
                </div>
              </div>
              <div className="images-slidshow">
                <div className="image-slider-item">
                  <Image src={'/6.png'} width={645} height={400} placeholder="blur" blurDataURL='/4.png' />
                </div>
              </div>
              <div className="images-slidshow">
                <div className="image-slider-item">
                  <Image src={'/7.png'} width={645} height={400} placeholder="blur" blurDataURL='/4.png' />
                </div>
              </div>
            </Carousel>
          </div>
          <div className="nanny-home-content">
            <h2 className="title">
              اعرض خدماتك واشتري أخرى, ماذا تنتظر !</h2>
            <p className="text">
              من شرفة منزلك لا تحتاج الخروج من بيتك للعمل, في تيموورك العمل يأتي أليك</p>
            <div className="py-2">
              <Image src={'/15.png'} width={550} height={160} placeholder="blur" blurDataURL='/4.png' />
            </div>
            <div className="pt-2">
              <Link href={'/add-new'}>
                <a className="btn butt-md butt-green">
                  أنشئ خدمتك الآن
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {products && popularProducts && latestProducts && products.data.length !== 0 && popularProducts.data.length !== 0 && latestProducts.data.length !== 0 &&
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
      }
      <div className='shadow' style={{ position: 'fixed', bottom: '3rem', left: '3rem', borderRadius: '50%', zIndex: 9999 }}>
        <Dropdown overlay={menu} placement="topCenter" arrow>
          <Button style={{
            width: '75px',
            height: '75px',
            borderRadius: '50%',
            padding: '0',
            color: '#475c80',
            borderColor: '#475c80',
          }}><i className="fa fa-comments fa-3x"></i></Button>
        </Dropdown>
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