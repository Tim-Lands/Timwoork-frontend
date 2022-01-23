import Link from "next/link";
import Layout from '@/components/Layout/HomeLayout'
import Comments from '../../components/Comments'
import { ReactElement, useState } from "react";
import API from '../../config'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
//import { useTranslation } from "react-i18next";
import Image from 'next/image'
import useSWR, { mutate } from "swr";
import Loading from '@/components/Loading'
import { message, Spin, Menu, notification } from 'antd'
import { MetaTags } from '@/components/SEO/MetaTags'
import PropTypes from "prop-types";
import { Field, Form, Formik } from "formik";
import Cookies from 'js-cookie'
import router from "next/router";
import NotFound from "@/components/NotFound";
import axios from 'axios';
import AsideBox from "@/components/Product/AsideBox";
import AboutSeller from "@/components/Product/AboutSeller";
import { NextSeo } from 'next-seo';

const REACT_APP_CHAT_ENGINE_ID = "ac320c2f-2637-48b3-879a-3fb1da5dbe03";

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  prevArrow: <div className="arrow-navigations" style={{ width: "30px", marginRight: "-30px" }}><span className="material-icons-outlined">chevron_left</span></div>,
  nextArrow: <div className="arrow-navigations" style={{ width: "30px", marginLeft: "-30px" }}><span className="material-icons-outlined">chevron_right</span></div>
}

// 
//const getFormattedPrice = (price: number) => `$${price}`;

function Single({ query }) {

  const token = Cookies.get('token')
  const { data: ProductData, errorLoad }: any = useSWR(`api/product/${query.product}`)
  const myLoader = () => {
    return `${ProductData && ProductData.data.profile_seller.profile.avatar}`;
  }
  const [quantutyCount, setQuantutyCount] = useState(1)
  const [isLoadingCart, setIsLoadingCart] = useState(false)

  const showStars = () => {
    const rate = Number(ProductData.data.ratings_count) || 0
    const xAr: any = [
      {
        id: 1,
        name: <span className="material-icons-outlined">star</span>
      },
      {
        id: 2,
        name: <span className="material-icons-outlined">star</span>
      },
      {
        id: 3,
        name: <span className="material-icons-outlined">star</span>
      },
      {
        id: 4,
        name: <span className="material-icons-outlined">star</span>
      },
      {
        id: 5,
        name: <span className="material-icons-outlined">star</span>
      },
    ]
    const yAr: any = [
      {
        id: 6,
        name: <span className="material-icons-outlined outline-star">star_border</span>
      },
      {
        id: 7,
        name: <span className="material-icons-outlined outline-star">star_border</span>
      },
      {
        id: 8,
        name: <span className="material-icons-outlined outline-star">star_border</span>
      },
      {
        id: 9,
        name: <span className="material-icons-outlined outline-star">star_border</span>
      },
      {
        id: 10,
        name: <span className="material-icons-outlined outline-star">star_border</span>
      },
    ]

    const x: number = 5
    const y: number = x - Number(rate)
    const yut: any = xAr.slice(y)
    if (rate == null) {
      return 0
    }
    if (y == 0) {
      return yut
    } else {
      const yut2: any = yAr.slice(-y, x)
      return yut.concat(yut2)
    }
  }
  const menuShare = (
    <Menu>
      {ProductData &&
        <Menu.Item key="1" icon={<i className="fa fa-facebook"></i>}>
          <a target="_blank" rel="noreferrer" href={`https://www.facebook.com/sharer/sharer.php?u=https://timwoork.com/p/${ProductData.data.title}`}>
            المشاركة على الفيسبووك
          </a>
        </Menu.Item>
      }
      {ProductData &&
        <Menu.Item key="2" icon={<i className="fa fa-facebook"></i>}>
          <a target="_blank" rel="noreferrer" href={`https://twitter.com/intent/tweet?url=https://timwoork.com/p/${ProductData.data.title}&text=`}>
            المشاركة على التويتر
          </a>
        </Menu.Item>
      }
    </Menu>
  );
  const addToCart = async () => {
    setIsLoadingCart(true)
    try {
      const res = await API.post("api/cart/store", {
        quantity: Number(quantutyCount),
        product_id: ProductData.data.id,
        developments: theIDs,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      // Authentication was successful.
      if (res.status === 200) {
        mutate('api/me')

        message.success('لقد تم التحديث بنجاح')
        const key = `open${Date.now()}`;
        const btn = (
          <button onClick={() => router.push("/cart")} className="btn butt-sm butt-primary">
            الذهاب إلى السلة
          </button>
        );

        notification.open({
          message: 'رسالة توضيحية',
          description:
            'لقد تم إضافة هذه الخدمة إلى السلة',
          btn,
          key,
          onClose: close,
        });
        setIsLoadingCart(false)
      }
    } catch (error: any) {
      setIsLoadingCart(false)
      if (error.response && error.response.status === 400) {
        message.error('لا يمكنك شراء هذه الخدمة, لأن هذه خدمتك')
      } else {

        message.error('حدث خطأ غير متوقع')
      }
    }

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
  const [theIDs, settheIDs] = useState([])
  const [checkedDevelopments, setcheckedDevelopments] = useState([]);

  const handleOnChangeAddID = event => {
    let newArray = [...theIDs, event.target.value];
    if (theIDs.includes(event.target.value)) {
      newArray = newArray.filter(day => day !== event.target.value);
    }
    settheIDs(newArray);
    setcheckedDevelopments(newArray);

  };
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
  /***** get the total price when any of  developments checkboxes or quantutyCount changed *****/
  function _totalPrice() {

    let __checkedDevelopments_sum = 0;
    const b = [],
      c = checkedDevelopments,
      a = ProductData && ProductData.data.developments.map(e => e.id);

    for (let i = 0; i < a.length; i++) {

      for (let j = 0; j < c.length; j++) {
        if (a[i] == c[j]) {
          b.push(i);
        }
      }
    }
    for (let i = 0; i < b.length; i++) {
      __checkedDevelopments_sum = __checkedDevelopments_sum + parseInt(ProductData && ProductData.data.developments[b[i]].price);
    }

    const total_price = (parseInt(ProductData.data.price) + __checkedDevelopments_sum) * quantutyCount;


    return Math.abs(total_price);
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
            //ogImage={'https://api.icoursat.com/products/thumbnails/' + ProductData && ProductData.data.thumbnail}
            //ogUrl={'https://api.icoursat.com/products/thumbnails/' + ProductData && ProductData.data.thumbnail}
          />
        </>
      }
      {ProductData &&
        <div className="timwoork-single">
          <div className="row">
            <div className="col-lg-8">
              <div className="timwoork-single-post">
                <div className="timwoork-single-header">
                  <h1 className="title">{ProductData.data.title}</h1>
                  <div className="timwoork-single-header-meta d-flex">
                    <ul className="single-header-meta nav me-auto">
                      <li className="user-item">
                        <Link href={`/u/${ProductData.data.profile_seller.profile.user.username}`}>
                          <a className="user-link">
                            {ProductData.data.profile_seller.profile.avatar == 'avatar.png' ?
                              <Image className="circular-center tiny-size ml-3" src="/avatar2.jpg" width={32} height={32} /> :
                              <Image
                                className="circular-center tiny-size"
                                loader={myLoader}
                                src={ProductData && ProductData.data.profile_seller.profile.avatar}
                                quality={1}
                                width={32}
                                height={32}
                                placeholder='blur'
                                blurDataURL='/avatar2.jpg'
                              />
                            }
                            <span className="pe-2">
                              {ProductData.data.profile_seller.profile.first_name + " " + ProductData.data.profile_seller.profile.last_name}
                            </span>
                          </a>
                        </Link>
                      </li>
                      <li className="category-item">
                        <Link href="/users/Single">
                          <a className="category-link">
                            <span className="material-icons material-icons-outlined">label</span>
                            {ProductData && ProductData.data.subcategory.category.name_ar}
                          </a>
                        </Link>
                      </li>
                    </ul>
                    <ul className="single-header-meta nav ml-auto">
                      <li className="rate-stars">
                        <span className="stars-icons">
                          {showStars().map((e: any) => <span key={e.id}>{e.name}</span>)}
                        </span>
                        <span className="stars-count">
                          ({ProductData.data.ratings_count})
                        </span>
                      </li>
                      <li className="level-item">
                        <span className="text-level">
                          المستوى:
                        </span>
                        <span className="value-level">
                          {ProductData && ProductData.data.profile_seller.level !== null && ProductData.data.profile_seller.level.name_ar}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
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
                      {ProductData.data.content}
                    </div>
                    {ProductData.data.product_tag &&
                      <div className="timwoork-single-tags">
                        <ul className="single-tags-list">
                          <li className="title">
                            الوسوم:
                          </li>

                          {ProductData.data.product_tag.map((e: any) => (
                            <li key={e.id}>
                              <Link href={'/' + e.id}>
                                <a>{e.name_ar}</a>
                              </Link>
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
                    <div className="timwoork-single-comments">
                      <div className="timwoork-single-comments-inner">
                        {ProductData.data.ratings && <>
                          <div className="single-comments-header">
                            <div className="flex-center">
                              <h1 className="title">
                                <span className="material-icons material-icons-outlined">question_answer</span>
                                التعليقات
                              </h1>
                            </div>
                          </div>
                          <div className="single-comments-body">
                            <Comments comments={ProductData.data.ratings} />
                          </div>
                        </>
                        }
                        {token && <>
                          <div className="single-comments-header">
                            <div className="flex-center">
                              <h1 className="title">
                                <span className="material-icons material-icons-outlined">rate_review</span>
                                أضف تعليقا
                              </h1>
                            </div>
                          </div>
                          <div className="timwoork-single-comment-form">
                            <Formik
                              initialValues={{
                                rating: 0,
                                comment: ''
                              }}
                              onSubmit={async (values) => {
                                try {
                                  const res = API.post(`api/product/${ProductData.data.id}/rating`, values, {
                                    headers: {
                                      'Authorization': `Bearer ${token}`
                                    }
                                  });
                                  console.log(res);
                                } catch (error) {
                                  message.error('حدث خطأ أثناء إضافة التعليق')
                                }
                              }}
                            >
                              {({ isSubmitting }) => (
                                <Form>
                                  <Spin spinning={isSubmitting}>
                                    <div className="stars">
                                      <p className="stars-text">التقييم: </p>
                                      <Field type="radio" id="rate-5" name="rating" value="5" />
                                      <label htmlFor="rate-5">
                                        <span className="material-icons">star</span>
                                      </label>
                                      <Field type="radio" id="rate-4" name="rating" value="4" />
                                      <label htmlFor="rate-4">
                                        <span className="material-icons">star</span>
                                      </label>
                                      <Field type="radio" id="rate-3" name="rating" value="3" />
                                      <label htmlFor="rate-3">
                                        <span className="material-icons">star</span>
                                      </label>
                                      <Field type="radio" id="rate-2" name="rating" value="2" />
                                      <label htmlFor="rate-2">
                                        <span className="material-icons">star</span>
                                      </label>
                                      <Field type="radio" id="rate-1" name="rating" value="1x " />
                                      <label htmlFor="rate-1">
                                        <span className="material-icons">star</span>
                                      </label>
                                    </div>
                                    <div className="form-textarea">
                                      <label htmlFor="comment-text" className="label-block">نص التعليق</label>
                                      <Field as="textarea" name="comment" id="comment-text" style={{ height: 230 }} className="timlands-inputs" placeholder="أكتب نص التعليق هنا"></Field>
                                    </div>
                                    <div className="py-3">
                                      <button disabled={isSubmitting} className="btn butt-primary butt-md" type="submit">إرسال التقييم</button>
                                    </div>
                                  </Spin>
                                </Form>
                              )}
                            </Formik>
                          </div>
                        </>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <AsideBox
                count_buying={ProductData && ProductData.data.count_buying}
                menuShare={menuShare}
                _totalPrice={_totalPrice}
                isLoadingCart={isLoadingCart}
                addToCart={addToCart}
                durationFunc={durationFunc}
                handleOnChangeAddID={handleOnChangeAddID}
                quantutyCount={quantutyCount}
                setQuantutyCount={setQuantutyCount}
                developments={ProductData && ProductData.data.developments}
                DevdurationFunc={DevdurationFunc}
              />
            </div>
          </div>
        </div>
      }
      {/*<div className="container">
        <PostsAside title="خدمات ذات صلة" PostData={testServices} />
    </div>*/}
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