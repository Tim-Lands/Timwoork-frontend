import Layout from '@/components/Layout/HomeLayout'
import Comments from '../../components/Comments'
import { ReactElement } from "react";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
//import { useTranslation } from "react-i18next";
import useSWR from "swr";
import Loading from '@/components/Loading'
import { MetaTags } from '@/components/SEO/MetaTags'
import PropTypes from "prop-types";
import Cookies from 'js-cookie'
import router from "next/router";
import NotFound from "@/components/NotFound";
import axios from 'axios';
import AsideBox from "@/components/Product/AsideBox";
import AboutSeller from "@/components/Product/AboutSeller";
import { NextSeo } from 'next-seo';
import ProductHeader from "@/components/Product/ProductHeader";

const REACT_APP_CHAT_ENGINE_ID = "ac320c2f-2637-48b3-879a-3fb1da5dbe03";

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  prevArrow: <div className="arrow-navigations" style={{ width: "30px", marginRight: "-30px" }}><span className="material-icons-outlined">chevron_left</span></div>,
  nextArrow: <div className="arrow-navigations" style={{ width: "30px", marginLeft: "-30px" }}><span className="material-icons-outlined">chevron_right</span></div>
}
function Single({ query }) {

  const { data: ProductData, errorLoad }: any = useSWR(`api/product/${query.product}`)
  const myLoader = () => {
    return `${ProductData && ProductData.data.profile_seller.profile.avatar}`;
  }

  function durationFunc() {
    if (ProductData.data.duration == 1) {
      return 'يوم واحد'
    }
    if (ProductData.data.duration == 2) {
      return 'يومين'
    }
    if (ProductData.data.duration > 2 && ProductData.data.duration < 11) {
      return ProductData.data.duration + ' أيام '
    }
    if (ProductData.data.duration >= 11) {
      return ProductData.data.duration + ' يوم '
    }
  }
  function DevdurationFunc(duration) {
    if (duration == 1) {
      return 'يوم واحد'
    }
    if (duration == 2) {
      return 'يومين'
    }
    if (duration > 2 && duration < 11) {
      return duration + ' أيام '
    }
    if (duration >= 11) {
      return duration + ' يوم '
    }
  }
  const APIURL2 = 'https://api.icoursat.com/products/galaries-images/'

  // ^--------------------*-------- Create New Chat----------*-------------------------------

  /* Create or get new chat between seller and buyer
  ~ Chat title: product title 
  */
  const getOrCreateChat = (seller_Email: string, seller_ID: String, seller_username: string) => {
    //for buyer
    const username = Cookies.get('_username');
    //const id = Cookies.get('_userID');
    //const _secret = (seller_Email+seller_ID).toString();
    //for seller
    const seller_secret = (seller_Email + seller_ID);
    console.log(`seller_username: ${seller_username}  seller_secret: ${seller_secret} --> seller_ID: ${seller_ID}`);
    axios.put('https://api.chatengine.io/chats/',
      { usernames: [seller_username, username], 'title': ProductData && ProductData.data.title, is_direct_chat: true },

      {
        headers: {
          'Project-ID': REACT_APP_CHAT_ENGINE_ID,
          'User-Name': seller_username,
          'User-Secret': seller_secret
        }
      }
    )
      .catch((error) => console.log(error))

    router.push('/chat');// Go to chat page
  }

  return (
    <>
      {!ProductData && <Loading />}
      {errorLoad && <NotFound />}
      {ProductData &&
        <>
          <NextSeo
            title={ProductData.data.title + ' - تيموورك'}
            description={ProductData.data.content}
          />
          <MetaTags
            title={ProductData.data.title + ' - تيموورك'}
            metaDescription={ProductData.data.content}
            ogDescription={ProductData.data.content}
          />
        </>
      }
        <div className="timwoork-single">
          <div className="row">
            <div className="col-lg-8">
              <div className="timwoork-single-post">
                <ProductHeader
                  title={ProductData && ProductData.data.title}
                  ratings_count={ProductData.data.ratings_count}
                  username={ProductData.data.profile_seller.profile.user.username}
                  avatar={ProductData.data.profile_seller.profile.avatar}
                  myLoader={myLoader}
                  level={ProductData && ProductData.data.profile_seller.level}
                  category={ProductData && ProductData.data.subcategory.category.name_ar}
                  fullname={ProductData && ProductData.data.profile_seller.profile.first_name + " " + ProductData && ProductData.data.profile_seller.profile.last_name}
                />
                <div className="timwoork-single-content">
                  <div className="timwoork-single-content-body">
                    <Slide {...properties}>
                      {ProductData && ProductData.data.galaries.map((each: any, index) => (
                        <>
                          {each.url_video == null ? <div key={index} className="each-slide">
                            <div className="images-slider" style={{ backgroundImage: `url(${APIURL2}${each.path})` }}></div>
                          </div> : ''}
                        </>
                      ))}
                    </Slide>
                    <div className="timwoork-single-product-detailts">
                      {ProductData && ProductData.data.content}
                    </div>
                    {ProductData && ProductData.data.product_tag &&
                      <div className="timwoork-single-tags">
                        <ul className="single-tags-list">
                          <li className="title">
                            الوسوم:
                          </li>
                          {ProductData.data.product_tag.map((e: any) => (
                            <li key={e.id}>
                              <a>{e.name}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    }
                    {ProductData.data.profile_seller &&
                      <AboutSeller
                        avatar={ProductData.data.profile_seller.profile.avatar}
                        myLoader={myLoader}
                        fullname={ProductData.data.profile_seller.profile.first_name + " " + ProductData.data.profile_seller.profile.last_name}
                        country={ProductData.data.profile_seller.profile.country}
                        badge={ProductData && ProductData.data.profile_seller.badge}
                        username={ProductData.data.profile_seller.profile.user.username}
                        getOrCreateChat={getOrCreateChat}
                        email={ProductData.data.profile_seller.profile.user.email}
                        userId={ProductData.data.profile_seller.profile.user.id}
                      />
                    }
                    {ProductData && ProductData.data.ratings && <Comments comments={ProductData && ProductData.data.ratings} />}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <AsideBox
                count_buying={ProductData && ProductData.data.count_buying}
                title={ProductData && ProductData.data.title}
                price={ProductData && ProductData.data.price}
                product_id={ProductData && ProductData.data.id}
                durationFunc={durationFunc}
                developments={ProductData && ProductData.data.developments}
                DevdurationFunc={DevdurationFunc}
              />
            </div>
          </div>
        </div>
    </>
  );
}
Single.getLayout = function getLayout(page: any): ReactElement {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
export default Single;

Single.getInitialProps = async ({ query }) => {
  return { query }
}
Single.propTypes = {
  query: PropTypes.any,
};