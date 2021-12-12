import Link from "next/link";
import Layout from '@/components/Layout/HomeLayout'
import Comments from '../../components/Comments'
import { ReactElement } from "react";
import API from '../../config'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import Image from 'next/image'
import useSWR from "swr";
import Loading from '@/components/Loading'
import { message, Spin } from 'antd'
import PropTypes from "prop-types";
import { Field, Form, Formik } from "formik";
import Cookies from 'js-cookie'

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

// 
function Single({ query }) {

  const token = Cookies.get('token')
  const { data: ProductData }: any = useSWR(`api/product/${query.product}`)
  if (!ProductData) { message.loading('يرجى الإنتظار...') }
  const APIURL = 'https://www.api.timwoork.com/avatars/'
  const myLoader = () => {
    return `${APIURL}${ProductData && ProductData.data.profile_seller.profile.avatar}`;
  }
  return (
    <>
      {!ProductData && <Loading />}
      {ProductData &&
        <div className="timwoork-single">
          <div className="row">
            <div className="col-lg-8">
              <div className="timwoork-single-post">
                <div className="timwoork-single-header">
                  <h1 className="title">{ProductData && ProductData.data.title}</h1>
                  <div className="timwoork-single-header-meta d-flex">
                    <ul className="single-header-meta nav me-auto">
                      <li className="user-item">
                        <Link href={`/u/`}>
                          <a className="user-link">
                            {ProductData && ProductData.data.profile_seller.profile.avatar == 'avatar.png' ?
                              <Image className="circular-center tiny-size ml-3" src="/avatar2.jpg" width={32} height={32} /> :
                              <Image
                                className="circular-center tiny-size"
                                loader={myLoader}
                                src={APIURL + ProductData && ProductData.data.profile_seller.profile.avatar}
                                quality={1}
                                width={32}
                                height={32}
                                placeholder='blur'
                                blurDataURL='/avatar2.jpg'
                              />
                            }
                            <span className="pe-2">
                              {ProductData && ProductData.data.profile_seller.profile.first_name + " " + ProductData.data.profile_seller.profile.last_name}
                            </span>
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
                      <li className="rate-stars">ن
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
                      {ProductData && ProductData.data.content}
                    </div>
                    {ProductData && ProductData.data.product_tag &&
                      <div className="timwoork-single-tags">
                        <ul className="single-tags-list">
                          <li className="title">
                            الوسوم:
                          </li>

                          {ProductData && ProductData.data.product_tag.map((e: any) => (
                            <li key={e.id}>
                              <Link href={'/' + e.id}>
                                <a>{e.name_ar}</a>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    }
                    {ProductData && ProductData.data.profile_seller &&
                      <div className="timwoork-single-seller-info">
                        <div className="seller-info-header">
                          <h2 className="title">حول البائع</h2>
                        </div>
                        <div className="seller-info-container">
                          <div className="d-flex">
                            <div className="seller-info-avatar">
                              {ProductData && ProductData.data.profile_seller.profile.avatar == 'avatar.png' ?
                                <Image className="circular-img huge-size" src="/avatar2.jpg" width={100} height={100} /> :
                                <Image
                                  className="circular-img huge-size"
                                  loader={myLoader}
                                  src={APIURL + ProductData && ProductData.data.profile_seller.profile.avatar}
                                  quality={1}
                                  width={100}
                                  height={100}
                                  placeholder='blur'
                                  blurDataURL='/avatar2.jpg'
                                />
                              }
                              <span className="is-online"></span>
                            </div>
                            <div className="seller-info-content">
                              <h3 className="user-title">
                                {ProductData && ProductData.data.profile_seller.profile.first_name + " " + ProductData && ProductData.data.profile_seller.profile.last_name}
                              </h3>
                              <ul className="user-meta nav">
                                <li>
                                  <span className="material-icons material-icons-outlined">badge</span> الشارة الذهبية
                                </li>
                                <li>
                                  <span className="material-icons material-icons-outlined">place</span> الجزائر
                                </li>
                              </ul>
                              <div className="seller-info-butts d-flex">
                                <Link href={"/u/" + ProductData && ProductData.data.profile_seller_id}>
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
                        {ProductData && ProductData.data.ratings && <>
                          <div className="single-comments-header">
                            <div className="flex-center">
                              <h1 className="title">
                                <span className="material-icons material-icons-outlined">question_answer</span>
                                التعليقات
                              </h1>
                            </div>
                          </div>
                          <div className="single-comments-body">
                            <Comments comments={ProductData && ProductData.data.ratings} />
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
                                  const res = API.post(`api/product/${ProductData && ProductData.data.id}/rating`, values, {
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
            <div className="col-lg-4"></div>
          </div>
        </div>
      }
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