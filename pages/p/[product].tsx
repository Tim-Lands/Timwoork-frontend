import Link from "next/link";
import Layout from '@/components/Layout/HomeLayout'
import Comments from '../../components/Comments'
import { ReactElement, useEffect, useState } from "react";
import API from '../../config'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
//import { useTranslation } from "react-i18next";
import useSWR, { mutate } from "swr";
import Loading from '@/components/Loading'
import { Dropdown, message, Spin, Menu, notification, Modal } from 'antd'
import { MetaTags } from '@/components/SEO/MetaTags'
import PropTypes from "prop-types";
import Cookies from 'js-cookie'
import router from "next/router";
import NotFound from "@/components/NotFound";
import Image from 'next/image'

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  prevArrow: <div className="arrow-navigations" style={{ width: "30px", marginRight: "-30px" }}><span className="material-icons-outlined">chevron_left</span></div>,
  nextArrow: <div className="arrow-navigations" style={{ width: "30px", marginLeft: "-30px" }}><span className="material-icons-outlined">chevron_right</span></div>
}
function Single({ query, stars, errorFetch }) {

  const token = Cookies.get('token')
  const { data: ProductData, errorLoad }: any = useSWR(`api/product/${query.product}`)
  const { data: userInfo }: any = useSWR('api/me')

  const [quantutyCount, setQuantutyCount] = useState(1)
  const [isLoadingCart, setIsLoadingCart] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [createConversationLoading, setCreateConversationLoading] = useState(false)

  useEffect(() => {
    if (errorFetch) {
      router.push('/404')
    }

  }, [])
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
  const allowOnlyNumericsOrDigits = (evt) => {
    const financialGoal = (evt.target.validity.valid) ? evt.target.value : quantutyCount;
    setQuantutyCount(financialGoal);
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
          <a target="_blank" rel="noreferrer" href={`https://twitter.com/intent/tweet?url=https://timwoork.com/p/${ProductData.data.slug}&text=`}>
            المشاركة على التويتر
          </a>
        </Menu.Item>
      }
    </Menu>
  );
  const [messageConv, setMessageConv] = useState('')
  const [hasConversation, setHasConversation] = useState(false)
  // Start Conversation 
  async function startConversation(message: string) {
    setCreateConversationLoading(true)
    try {
      const res = await API.post(`api/product/${ProductData && ProductData.data.id}/conversations/create`, {
        initial_message: message,
        receiver_id: ProductData && ProductData.data.profile_seller.profile.user_id,
        title: ProductData && ProductData.data.title,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.status === 200) {
        setIsModalVisible(false)
        router.push('/conversations');
        setHasConversation(true)
      }
    } catch (error) {
      setCreateConversationLoading(false)
    }

  }
  const addToCart = async () => {
    const veriedEmail = userInfo && userInfo.user_details.email_verified_at
    if (!veriedEmail) {
      router.push('/email/verification')
    }
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
            placement: 'topLeft',
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
            placement: 'topLeft'
          });
        } else if (error.response && error.response.status === 404) {
          notification.warning({
            message: `تحذير`,
            description: 'لايجوز إضافة نفس الخدمة إلى السلة مرتين!',
            placement: 'topLeft'
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
      {!errorFetch && <MetaTags
        title={stars.data.title + ' - تيموورك'}
        metaDescription={stars.data.content}
        ogDescription={stars.data.content}
        ogImage={stars.data.full_path_thumbnail}
        ogUrl={`https://timwoork.com/p/${stars.data.slug}`}
      />}

      {ProductData &&
        <div className="timwoork-single">
          <Modal
            title="إنشاء محادثة"
            visible={isModalVisible}
            confirmLoading={createConversationLoading}
            onOk={() => startConversation(messageConv)}
            cancelText="إلغاء الامر"
            okText="بدء المحادثة"
            onCancel={() => setIsModalVisible(false)}
          >
            <textarea
              name="messageConv"
              className="timlands-inputs"
              placeholder="أكتب رسالة ابتدائية للبائع"
              style={{ height: 180 }}
              disabled={createConversationLoading}
              value={messageConv}
              onChange={(e: any) => setMessageConv(e.target.value)}
            ></textarea>
          </Modal>
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
                            <Image
                              className="circular-center tiny-size"
                              src={ProductData.data.profile_seller.profile.avatar_url}
                              quality={80}
                              width={32}
                              height={32}
                              alt={ProductData.data.profile_seller.profile.full_name}
                              placeholder='blur'
                              blurDataURL={ProductData.data.profile_seller.profile.avatar_url}
                            />
                            <span className="pe-2">
                              {ProductData.data.profile_seller.profile.full_name}
                            </span>
                          </a>
                        </Link>
                      </li>
                      <li className="category-item">
                        <span className="material-icons material-icons-outlined">label</span>{ProductData && ProductData.data.subcategory.category.name_ar}
                        <span style={{ marginInline: 5 }}>||</span>
                        <small>
                          <Link href={`/category/${ProductData && ProductData.data.subcategory.id}`}>
                            <a style={{ marginInline: 5 }} className="category-link">
                              {ProductData && ProductData.data.subcategory.name_ar}
                            </a>
                          </Link>
                        </small>
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
                              <span>{e.name}</span>
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
                              <Image
                                className="circular-img huge-size"
                                src={ProductData && ProductData.data.profile_seller.profile.avatar_url}
                                quality={80}
                                width={100}
                                alt={ProductData.data.profile_seller.profile.full_name}
                                placeholder='blur'
                                blurDataURL={ProductData.data.profile_seller.profile.avatar_url}
                                height={100}
                              />
                            </div>
                            <div className="seller-info-content">
                              <h4 className="user-title">
                                {ProductData.data.profile_seller.profile.first_name + " " + ProductData.data.profile_seller.profile.last_name}
                              </h4>
                              <ul className="user-meta nav">
                                <li>
                                  <span className="material-icons material-icons-outlined">badge</span> {ProductData && ProductData.data.profile_seller.level !== null && ProductData.data.profile_seller.level.name_ar}
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
                                {!hasConversation &&
                                  <button className="btn butt-green butt-sm flex-center" disabled={createConversationLoading} onClick={() => setIsModalVisible(true)}>
                                    <i className="material-icons material-icons-outlined" >email</i> مراسلة البائع {createConversationLoading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                                  </button>
                                }
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
                                آراء المشتريين
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
                            <span>
                              <span className="material-icons material-icons-outlined">share</span> مشاركة الخدمة
                            </span>
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
                          maxLength={2}
                          onInput={allowOnlyNumericsOrDigits}
                          pattern="[0-9]*"
                          value={quantutyCount}
                          name="quantity_count"
                          className="timlands-inputs sm"
                        //onChange={(e: any) => setQuantutyCount(e.target.value)}
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
export async function getServerSideProps({ query }) {
  try {
    const uriString = encodeURI(`api/product/${query.product}`)
    // Fetch data from external API
    const res = await API.get(uriString)

    // Pass data to the page via props
    return { props: { stars: res.data, query, errorFetch: false } }

  } catch (error) {
    return { props: { stars: null, query, errorFetch: true } }
  }
}
Single.propTypes = {
  query: PropTypes.any,
  stars: PropTypes.any,
  errorFetch: PropTypes.bool,
};