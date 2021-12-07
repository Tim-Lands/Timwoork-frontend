import Link from "next/link";
import Layout from '@/components/Layout/HomeLayout'
import Comments from '../../components/Comments'
import { ReactElement, useState } from "react";
import PostsAside from "@/components/PostsAside";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
//import { useTranslation } from "react-i18next";
import { useCart } from "react-use-cart";
import useSWR from "swr";
import Loading from '@/components/Loading'

import PropTypes from "prop-types";

const testServices = [
  {
    id: 1,
    title: 'هذا النص يمكن أن يتم تركيبه على أي تصميم دون مشكلة',
    author: 'عبد الحميد بومقواس',
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
    title: 'هذا النص غير منظم، غير أو حتى غير مفهوم. لأنه',
    author: 'طارق عروي',
    rate: 4,
    price: 40,
    postUrl: '/Single',
    thumbnail: '/homepage.jpg',
    period: 9,
    buyers: 5,
    userUrl: '/user'
  },
  {
    id: 3,
    title: 'هذا النص يمكن أن يتم تركيبه على أي تصميم دون',
    author: 'ضياء الدين محمد',
    rate: 4,
    price: 40,
    postUrl: '/Single',
    thumbnail: '/slide_3.jpg',
    period: 9,
    buyers: 5,
    userUrl: '/user'
  },
  {
    id: 4,
    title: 'هذا النص يمكن أن يتم تركيبه على أي تصميم',
    author: 'رقية الرفوع',
    rate: 4,
    price: 40,
    postUrl: '/Single',
    thumbnail: '/slide_2.jpg',
    period: 9,
    buyers: 5,
    userUrl: '/user'
  },
]
const slideImages = [
  "/slide_2.png",
  "/slide_3.jpg",
  "/homepage.jpg"
];

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  prevArrow: <div className="arrow-navigations" style={{ width: "30px", marginRight: "-30px" }}><span className="material-icons-outlined">chevron_left</span></div>,
  nextArrow: <div className="arrow-navigations" style={{ width: "30px", marginLeft: "-30px" }}><span className="material-icons-outlined">chevron_right</span></div>
}

const toppings = [
  {
    id: 1,
    name: "الحروف التى يولدها التطبيق",
    price: 11.2
  },
  {
    id: 2,
    name: "الأخرى إضافة إلى زيادة عدد",
    price: 22.0
  },
  {
    id: 3,
    name: " مولد النص العربى زيادة عدد الفقرات ",
    price: 2.5
  },
  {
    id: 4,
    name: "يطلع على صورة حقيقية لتصميم الموقع",
    price: 33.0
  },
  {
    id: 5,
    name: "مشكلة فلن يبدو وكأنه نص منسوخ",
    price: 23.5
  },
]

// 
const getFormattedPrice = (price: any) => `$${price.toFixed(2)}`;

function Single({ query }) {
  const { data: ProductData }: any = useSWR(`api/product/${query.product}`)

  const [checkedState, setCheckedState] = useState(
    new Array(toppings.length).fill(false)
  );

  const [total, setTotal] = useState(0);
  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    const totalPrice = updatedCheckedState.reduce(
      (sum, currentState, index) => {
        if (currentState === true) {
          return sum + toppings[index].price;
        }
        return sum;
      },
      0
    );

    setTotal(totalPrice);
  };
  const { addItem, inCart } = useCart();

  return (
    <>
      {!ProductData && <Loading />}

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
                        <Link href="/users/Single">
                          <a className="user-link">
                            <img src="/avatar.png" className="circular-center tiny-size" alt="" />
                            عبد الحميد بومقواس
                          </a>
                        </Link>
                      </li>
                      <li className="category-item">
                        <Link href="/users/Single">
                          <a className="category-link">
                            <span className="material-icons material-icons-outlined">label</span>
                            التصميم الغرافيكي
                          </a>
                        </Link>
                      </li>
                    </ul>
                    <ul className="single-header-meta nav ml-auto">
                      <li className="rate-stars">
                        <span className="stars-icons">
                          <span className="material-icons-outlined">star</span>
                          <span className="material-icons-outlined">star</span>
                          <span className="material-icons-outlined">star</span>
                          <span className="material-icons-outlined">star</span>
                          <span className="material-icons-outlined outline-star">star_border</span>
                        </span>
                        <span className="stars-count">
                          (90)
                        </span>
                      </li>
                      <li className="level-item">
                        <span className="text-level">
                          المستوى
                        </span>
                        <span className="value-level">
                          بائع محترف
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="timwoork-single-content">
                  <div className="timwoork-single-content-body">
                    <Slide {...properties}>
                      {slideImages.map((each, index) => (
                        <div key={index} className="each-slide">
                          <div className="images-slider" style={{ backgroundImage: `url(${each})` }}></div>
                        </div>
                      ))}
                    </Slide>
                    <div className="timwoork-single-product-detailts">

                      <h1>هذا النص هو مثال لنص في نفس</h1>
                      <h2>المساحة، لقد تم توليد هذا </h2>
                      <ul className="single-list">
                        <li>النص من مولد النص العربى، حيث</li>
                        <li>نصوصا مؤقتة على التصميم ليظهر للعميل
                          <ul>
                            <li>النص من مولد النص العربى، حيث</li>
                            <li>المواقع على وجه الخصوص، حيث</li>
                            <li>العربى أن يوفر على المصمم عناء</li>
                            <li>زيادة عدد الفقرات كما تريد، النص لن يبدو</li>
                            <li>النص من مولد النص العربى، حيث</li>
                          </ul>
                        </li>
                        <li>مولد النص العربى مفيد لمصممي المواقع</li>
                        <li>على وجه الخصوص، حيث يحتاج</li>
                        <li>يطلع على صورة حقيقية لتصميم الموقع</li>
                      </ul>
                      <h3>العربى أن يوفر على المصمم عناء</h3>
                      <p className="text">
                        هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.
                        إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممي المواقع على وجه الخصوص، حيث يحتاج العميل فى كثير من الأحيان أن يطلع على صورة حقيقية لتصميم الموقع.
                      </p>
                      <h4>مولد النص العربى مفيد لمصممي المواقع</h4>
                    </div>
                    {ProductData.data.profile_seller &&
                      <div className="timwoork-single-seller-info">
                        <div className="seller-info-header">
                          <h2 className="title">حول البائع</h2>
                        </div>
                        <div className="seller-info-container">
                          <div className="d-flex">
                            <div className="seller-info-avatar">
                              <img className="circular-img huge-size" src="/avatar.png" alt="" />
                              <span className="is-online"></span>
                            </div>
                            <div className="seller-info-content">
                              <h3 className="user-title">عبد الحميد بومقواس</h3>
                              <ul className="user-meta nav">
                                <li>
                                  <span className="material-icons material-icons-outlined">badge</span> الشارة الذهبية
                                </li>
                                <li>
                                  <span className="material-icons material-icons-outlined">place</span> <strong>الجلفة</strong>, الجزائر
                                </li>
                                <li>
                                  <span className="material-icons material-icons-outlined">speed</span> 4 ساعات
                                </li>
                              </ul>
                              <div className="seller-info-butts d-flex">
                                <Link href="">
                                  <a className="btn butt-primary butt-sm flex-center">
                                    <i className="material-icons material-icons-outlined">account_circle</i> الملف الشخص
                                  </a>
                                </Link>
                                <Link href="">
                                  <a className="btn butt-green butt-sm flex-center">
                                    <i className="material-icons material-icons-outlined">email</i> مراسلة البائع
                                  </a>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    }

                    <div className="timwoork-single-comments">
                      <div className="timwoork-single-comments-inner">
                        <div className="single-comments-header">
                          <div className="flex-center">
                            <h1 className="title">
                              <span className="material-icons material-icons-outlined">question_answer</span>
                              التعليقات
                            </h1>
                          </div>
                        </div>
                        <div className="single-comments-body">
                          <Comments />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="single-sidebar">
                <div className="single-panel-aside">
                  <div className="panel-aside-header">
                    <ul className="nav top-aside-nav">
                      <li className="cat-post">
                        <Link href="">
                          <a>
                            <span className="material-icons material-icons-outlined">label</span>التصميم الغرافيكي
                          </a>
                        </Link>
                      </li>
                      <li className="delevr-time">
                        <span className="material-icons material-icons-outlined">timer</span> مدة التسليم: يومين
                      </li>
                    </ul>
                  </div>
                  {ProductData.data.developments &&
                    <div className="panel-aside-body">
                      <div className="add-devloppers-header">
                        <h3 className="title">التطويرات المتوفرة</h3>
                      </div>
                      <ul className="add-devloppers-nav">
                        {ProductData.data.developments.map((e: any, index) => {
                          return (
                            <li key={e.id} className="devloppers-item">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id={"flexCheckDefault-id" + e.id}
                                  value={e.price}
                                  checked={checkedState[index]}
                                  onChange={() => handleOnChange(index)}
                                />
                                <label className="form-check-label" htmlFor={"flexCheckDefault-id" + e.id}>
                                  {e.title}<strong>({e.duration})</strong>
                                </label>
                              </div>
                              <div className="devloppers-price">
                                <p className="price-number">{e.price}$</p>
                              </div>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  }
                  <div className="panel-aside-footer">
                    <div className="aside-footer-total-price">
                      <h1 className="price-total me-auto">
                        <strong>المجموع </strong> {getFormattedPrice(total)}
                      </h1>
                      <div className="bayers-count">
                        <p className="num">
                          <span className="count">5 </span>
                          <span className="text"> اشتروا هذا</span>
                        </p>
                      </div>
                    </div>
                    <div className="aside-footer-note">
                      <p className="text">هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا</p>
                    </div>
                    <div className="aside-footer-addtocart">
                      {inCart(ProductData.data.id) ?

                        <button disabled={true} className="btn butt-white butt-lg">
                          <span className="material-icons material-icons-outlined">remove_shopping_cart</span>
                          تمت الإضافة
                        </button>
                        :
                        <button
                          onClick={() => addItem({
                            id: ProductData.data.id,
                            title: ProductData.data.title,
                            checkedState: checkedState,
                            color: "Neon Emerald with Dark Neptune",
                            size: "US 9",
                            developments: ProductData.data.developments,
                            width: "B - Standard",
                            sku: "W1080LN9",
                            price: total + ProductData.data.price,
                          }, ProductData.data.id)}
                          className="btn butt-primary butt-lg">
                          <span className="material-icons material-icons-outlined">add_shopping_cart</span>
                          إضافة إلى السلة
                        </button>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      <div className="container">
        <PostsAside title="خدمات ذات صلة" PostData={testServices} />
      </div>
    </>
  );
}
Single.getLayout = function getLayout(page): ReactElement {
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