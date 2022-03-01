import Link from "next/link";
import Layout from '@/components/Layout/HomeLayout'
import { ReactElement, useEffect, useState } from "react";
import API from '../../config'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
//import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import Cookies from 'js-cookie'
import router from "next/router";
import useSWR from "swr";
import { Alert } from "@/components/Alert/Alert";
import { MetaTags } from "@/components/SEO/MetaTags";
import { notification, Spin } from "antd";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  prevArrow: <div className="arrow-navigations" style={{ width: "30px", marginRight: "-30px" }}><span className="material-icons-outlined">chevron_left</span></div>,
  nextArrow: <div className="arrow-navigations" style={{ width: "30px", marginLeft: "-30px" }}><span className="material-icons-outlined">chevron_right</span></div>
}
const token = Cookies.get('token')
function Single({ query, stars }) {
  const { data: ProductData }: any = useSWR(`api/my_products/${query.product}`)
  const disactiveProductHandle = async (id: any) => {
    const MySwal = withReactContent(Swal)

    const swalWithBootstrapButtons = MySwal.mixin({
      customClass: {
        confirmButton: 'btn butt-red butt-sm me-1',
        cancelButton: 'btn butt-green butt-sm'
      },
      buttonsStyling: false
    })
    try {
      const res = await API.post(`api/my_products/${id}/disactive_product`, null, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.status === 200) {
        swalWithBootstrapButtons.fire(
          'تم التعطيل!',
          'لقد تم تعطيل هذه الخدمة بنجاح',
          'success'
        )
        router.reload()
      }
    } catch (error) {
      notification['error']({
        message: 'رسالة خطأ',
        description: 'للأسف لم يتم تعطيل هذه الخدمة',
      });
    }
  }
  const [isProductActive, setIsProductActive] = useState(false)
  const activeProductHandle = async (id: any) => {
    const MySwal = withReactContent(Swal)

    const swalWithBootstrapButtons = MySwal.mixin({
      customClass: {
        confirmButton: 'btn butt-red butt-sm me-1',
        cancelButton: 'btn butt-green butt-sm'
      },
      buttonsStyling: false
    })
    try {
      setIsProductActive(true)
      const res = await API.post(`api/my_products/${id}/active_product`, null, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.status === 200) {
        setIsProductActive(false)
        swalWithBootstrapButtons.fire(
          'تم التنشيط!',
          'لقد تم تنشسط هذه الخدمة بنجاح',
          'success'
        )
        router.reload()
      }
    } catch (error) {
      setIsProductActive(false)
      notification['error']({
        message: 'رسالة خطأ',
        description: 'للأسف لم يتم تنشيط هذه الخدمة',
      });
    }
  }
  useEffect(() => {
    if (!token) {
      router.push('/login')
    }
    //getProductData()
    //console.log(ProductData);

  }, [])
  const [quantutyCount, setQuantutyCount] = useState(1)

  const showStars = () => {
    const rate = Number(ProductData.ratings_count) || 0
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
  const handleChange = (evt) => {
    const financialGoal = (evt.target.validity.valid) ? evt.target.value : quantutyCount;
    setQuantutyCount(financialGoal);
  }
  return (
    <>
      <MetaTags
        title={stars.data.title + ' - تيموورك'}
        metaDescription={stars.data.content}
        ogDescription={stars.data.content}
        ogImage={stars.data.full_path_thumbnail}
        ogUrl={`https://timwoork.com/p/${stars.data.slug}`}
      />
      {ProductData &&
        <div className="timwoork-single">
          {ProductData.data.is_active == null &&
            <div style={{ marginTop: 27 }}>
              <Alert type="warning">هذه الخدمة غير كامة تنقصها بعض التعديلات يمكنك <Link href={`/edit-product/overview?id=${ProductData.data.id}`}> التعديل </Link></Alert>
            </div>
          }
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
                              <span>{e.name}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="single-sidebar">
                {ProductData.data.is_active == 1 && <div className="d-flex">
                  <Link href={`/edit-product/overview?id=${ProductData.data.id}`}>
                    <a className="btn butt-md butt-green flex-center-just mb-1 mx-1">
                      <span className="material-icons material-icons-outlined">create</span> تعديل الخدمة
                    </a>
                  </Link>
                  <button className="btn butt-md butt-red flex-center-just mb-1 mx-1">
                    <span className="material-icons material-icons-outlined">delete</span> حذف الخدمة
                  </button>
                </div>
                }
                {ProductData.data.is_active == null && <div className="d-flex">
                  <button className="btn butt-md butt-green flex-center-just mb-1 mx-1">
                    <span className="material-icons material-icons-outlined">create</span> طلب تعديل الخدمة
                  </button>
                  <button className="btn butt-md butt-red flex-center-just mb-1 mx-1">
                    <span className="material-icons material-icons-outlined">delete</span> طلب حذف الخدمة
                  </button>
                </div>
                }
                <div className="single-panel-aside">
                  <div className="panel-aside-header">
                    <ul className="nav top-aside-nav">
                      <li className="delevr-time me-auto">
                        <span className="material-icons material-icons-outlined">timer</span> مدة التسليم: {durationFunc()}
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
                  </div>
                  {ProductData.data.status !== null &&
                    <Spin spinning={isProductActive}>

                      {ProductData.data.is_active == 0 && ProductData.data.is_completed == 1 ?
                        <Alert type="error">
                          هذه الخدمة معطلة يمكنك تفعيلها
                          <button
                            disabled={isProductActive}
                            onClick={() => activeProductHandle(ProductData.data.id)}
                            className="btn butt-xs butt-primary"
                          >تفعيل
                          </button> </Alert> :
                        <button
                          disabled={isProductActive}
                          style={{ width: '100%', marginTop: 5 }}
                          onClick={() => disactiveProductHandle(ProductData.data.id)}
                          className="btn butt-sm butt-red"
                        >تعطيل هذه الخدمة
                        </button>}

                    </Spin>
                  }
                </div>
              </div>
            </div>
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
export async function getServerSideProps({ query }) {
  const uriString = encodeURI(`api/product/${query.product}`)
  // Fetch data from external API
  const res = await API.get(uriString)

  // Pass data to the page via props
  return { props: { stars: res.data, query } }
}
Single.propTypes = {
  query: PropTypes.any,
  stars: PropTypes.any,
};