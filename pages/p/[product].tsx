import Link from "next/link";
import Layout from '@/components/Layout/HomeLayout'
import Comments from '../../components/Comments'
import { ReactElement, useState } from "react";
import API from '../../config'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
//import { useTranslation } from "react-i18next";
import useSWR, { mutate } from "swr";
import Loading from '@/components/Loading'
import { Dropdown, message, Spin, Menu, notification } from 'antd'
import { MetaTags } from '@/components/SEO/MetaTags'
import PropTypes from "prop-types";
import Cookies from 'js-cookie'
import router from "next/router";
import NotFound from "@/components/NotFound";
import axios from 'axios';

const REACT_APP_CHAT_ENGINE_ID = "ac320c2f-2637-48b3-879a-3fb1da5dbe03";

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  prevArrow: <div className="arrow-navigations" style={{ width: "30px", marginRight: "-30px" }}><span className="material-icons-outlined">chevron_left</span></div>,
  nextArrow: <div className="arrow-navigations" style={{ width: "30px", marginLeft: "-30px" }}><span className="material-icons-outlined">chevron_right</span></div>
}
function Single({ query }) {

  const token = Cookies.get('token')
  const { data: ProductData, errorLoad }: any = useSWR(`api/product/${query.product}`)
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
  const menu = (
    <Menu>
      {ProductData &&
        <Menu.Item key="1" icon={<i className="fa fa-facebook"></i>}>
          <a target="_blank" rel="noreferrer" href={`https://www.facebook.com/sharer/sharer.php?kid_directed_site=0&sdk=joey&u=https://timwoork.com/p/${ProductData.data.slug}&display=popup&ref=plugin&src=share_button`}>
            المشاركة على الفيسبووك
          </a>
        </Menu.Item>
      }
      {ProductData &&
        <Menu.Item key="2" icon={<i className="fa fa-facebook"></i>}>
          <a target="_blank" rel="noreferrer" href={`https://twitter.com/intent/tweet?url=https%3A%2F%2Fforum-wazzfny.com%2Fp%2F${ProductData.data.developments}&text=`}>
            المشاركة على التويتر
          </a>
        </Menu.Item>
      }
    </Menu>
  );
  const addToCart = async () => {
    if (token) {
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
          const key = `open${Date.now()}`;
          const btn = (
            <button onClick={() => router.push("/cart")} className="btn butt-sm butt-primary">
              الذهاب إلى السلة
            </button>
          );

          notification.open({
            message: 'إشعار',
            description:
              'لقد تم إضافة هذه الخدمة إلى السلة',
            placement: 'bottomRight',
            btn,
            key,
            onClose: close,
          });
          setIsLoadingCart(false)
        }
      } catch (error: any) {
        setIsLoadingCart(false)
        if (error.response && error.response.status === 400) {
          notification.warning({
            message: `تحذير`,
            description: 'لا يمكنك شراء خدمتك!',
            placement: 'bottomRight'
          });
        } else if (error.response && error.response.status === 404) {
          notification.warning({
            message: `تحذير`,
            description: 'لايجوز إضافة نفس الخدمة إلى السلة مرتين!',
            placement: 'bottomRight'
          });
        }
        else {

          message.error('حدث خطأ غير متوقع')
        }
      }
    } else {
      router.push('/login')
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
  const handleChange = (evt) => {
    const financialGoal = (evt.target.validity.valid) ? evt.target.value : quantutyCount;

    setQuantutyCount(financialGoal);
  }
  return (
    <>
      {!ProductData && <Loading />}
      {errorLoad && <NotFound />}

      <MetaTags
        title={ProductData && ProductData.data.title + ' - تيموورك'}
        metaDescription={ProductData && ProductData.data.content}
        ogDescription={ProductData && ProductData.data.content}
        ogImage={ProductData && ProductData.data.full_path_thumbnail}
        ogUrl={`https://timwoork.com/p/${ProductData && ProductData.data.slug}`}
      />

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
                            {/*<Image
                              className="circular-center tiny-size"
                              loader={myLoader}
                              src={ProductData && ProductData.data.profile_seller.profile.avatar_url}
                              quality={1}
                              width={32}
                              height={32}
                              placeholder='blur'
                              blurDataURL='/avatar2.jpg'
                            />*/}
                            <span className="pe-2">
                              {ProductData.data.profile_seller.profile.full_name}
                            </span>
                          </a>
                        </Link>
                      </li>
                      <li className="category-item">
                        <Link href={`/category/${ProductData && ProductData.data.subcategory.id}`}>
                          <a className="category-link">
                            <span className="material-icons material-icons-outlined">label</span>
                            {ProductData && ProductData.data.subcategory.name_ar}
                          </a>
                        </Link> <span style={{ marginInline: 5 }}>|</span>
                        <small style={{ marginInline: 5 }}>{ProductData && ProductData.data.subcategory.category.name_ar}</small>
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
                              <a>{e.name}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    }
                    {ProductData.data.profile_seller &&
                      <div className="timwoork-single-seller-info">
                        <div className="seller-info-header">
                          <h4 className="title">حول البائع</h4>
                        </div>
                        <div className="seller-info-container">
                          <div className="d-flex">
                            <div className="seller-info-avatar">
                              {/*<Image
                                className="circular-img huge-size"
                                loader={myLoader}
                                src={ProductData && ProductData.data.profile_seller.profile.avatar_url}
                                quality={1}
                                width={100}
                                height={100}
                                placeholder='blur'
                                blurDataURL='/avatar2.jpg'
                              />*/}
                            </div>
                            <div className="seller-info-content">
                              <h4 className="user-title">
                                {ProductData.data.profile_seller.profile.first_name + " " + ProductData.data.profile_seller.profile.last_name}
                              </h4>
                              <ul className="user-meta nav">
                                <li>
                                  <span className="material-icons material-icons-outlined">badge</span> {ProductData && ProductData.data.profile_seller.badge !== null && ProductData.data.profile_seller.badge.name_ar}
                                </li>
                                {ProductData.data.profile_seller.profile.country !== null &&
                                  <li>
                                    <span className="material-icons material-icons-outlined">place</span> الجزائر
                                  </li>
                                }
                              </ul>
                              <div className="seller-info-butts d-flex">
                                <Link href={"/u/" + ProductData.data.profile_seller.profile.user.username}>
                                  <a className="btn butt-primary butt-sm flex-center">
                                    <i className="material-icons material-icons-outlined">account_circle</i> الملف الشخصي
                                  </a>
                                </Link>
                                <a className="btn butt-green butt-sm flex-center" onClick={() => getOrCreateChat(ProductData.data.profile_seller.profile.user.email, ProductData.data.profile_seller.profile.user.id, ProductData.data.profile_seller.profile.user.username)}>
                                  <i className="material-icons material-icons-outlined" >email</i> مراسلة البائع
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                    {ProductData.data.ratings && ProductData.data.ratings.length !== 0 &&
                      <div className="timwoork-single-comments">
                        <div className="timwoork-single-comments-inner">
                          <div className="single-comments-header">
                            <div className="flex-center">
                              <h4 className="title">
                                <span className="material-icons material-icons-outlined">question_answer</span>
                                التعليقات
                              </h4>
                            </div>
                          </div>
                          <div className="single-comments-body">
                            <Comments comments={ProductData.data.ratings} />
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="single-sidebar">
                <Spin spinning={isLoadingCart}>
                  <div className="single-panel-aside">
                    <div className="panel-aside-header">
                      <ul className="nav top-aside-nav">
                        <li className="delevr-time me-auto">
                          <span className="material-icons material-icons-outlined">timer</span> مدة التسليم: {durationFunc()}
                        </li>
                        <li className="cat-post ml-auto">
                          <Dropdown overlay={menu}>
                            <a>
                              <span className="material-icons material-icons-outlined">share</span> مشاركة الخدمة
                            </a>
                          </Dropdown>
                        </li>
                      </ul>
                    </div>
                    <div className="row mx-auto py-2">
                      <div className="col-7">
                        <p className="text-quatity">عدد مرات الشراء: </p>
                      </div>
                      <div className="col-5">
                        <input
                          type="text"
                          maxLength={9}
                          onInput={handleChange}
                          pattern="[0-9]*"
                          value={quantutyCount}
                          name="quantity_count"
                          className="timlands-inputs sm"
                          onChange={(e: any) => setQuantutyCount(e.target.value)}
                        />
                      </div>
                    </div>
                    {ProductData.data.developments &&
                      <div className="panel-aside-body">
                        <div className="add-devloppers-header">
                          <h4 className="title">التطويرات المتوفرة</h4>
                        </div>
                        <ul className="add-devloppers-nav">
                          {ProductData.data.developments.map((e: any) => {
                            return (
                              <li key={e.id} className="devloppers-item">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={"flexCheckDefault-id" + e.id}
                                    value={e.id}
                                    onChange={handleOnChangeAddID} {..._totalPrice()}
                                  />
                                  <label className="form-check-label" htmlFor={"flexCheckDefault-id" + e.id}>
                                    {e.title}
                                    <p className="price-duration">ستكون المدة {DevdurationFunc(e.duration)} بمبلغ {e.price}$</p>
                                  </label>
                                </div>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    }
                    <div className="panel-aside-footer">
                      <div className="aside-footer-total-price">
                        <h4 className="price-total me-auto">
                          <strong>المجموع </strong> {_totalPrice()}$
                        </h4>
                        <div className="bayers-count">
                          <p className="num">
                            <span className="count">{ProductData && ProductData.data.count_buying} </span>
                            <span className="text"> اشتروا هذا</span>
                          </p>
                        </div>
                      </div>
                      <div className="aside-footer-addtocart mt-3">
                        {/*<button disabled={true} className="btn butt-white butt-lg">
                            <span className="material-icons material-icons-outlined">remove_shopping_cart</span>
                            تمت الإضافة
                          </button>*/}

                        <button
                          onClick={addToCart}
                          className="btn butt-primary butt-lg">
                          <span className="material-icons material-icons-outlined">add_shopping_cart</span>
                          إضافة إلى السلة
                        </button>
                      </div>
                    </div>
                  </div>
                </Spin>
              </div>
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