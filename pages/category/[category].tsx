import React, { ReactElement } from 'react'
import Layout from '@/components/Layout/HomeLayout'
import FilterContent from '../../components/filterLayout'
import { Field, Form, Formik } from "formik";
import { motion } from "framer-motion";
import useSWR from 'swr'
import Loading from '@/components/Loading';

const products = [
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
  {
    id: 5,
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
  {
    id: 6,
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
  {
    id: 7,
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
  {
    id: 8,
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
function Category() {
  const { data: getCategories, error }: any = useSWR('dashboard/categories')
  if (!getCategories) return <Loading />
  if (error) return <div>Error</div>
  return (
    <div className="container py-5">
      <Formik
        isInitialValid={true}
        initialValues={{
          code: '',
        }}
        onSubmit={async values => {
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="row">
              <div className="col-md-3">
                <div className="filter-search-sidebar">
                  <div className="filter-sidebar-title">
                    <h3 className="title">فلترة الخدمات</h3>
                  </div>
                  <div className="filter-sidebar-panel">
                    <h3 className="title">السعر</h3>
                    <div className="row">
                      <div className="col-6">
                        <div className="timlands-form">
                          <Field
                            id="code"
                            name="code"
                            placeholder="0000"
                            className="timlands-inputs sm"
                            autoComplete="off"
                          />
                          {errors.code && touched.code ?
                            <div style={{ overflow: 'hidden' }}>
                              <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                <p className="text">{errors.code}</p>
                              </motion.div>
                            </div>
                            :
                            null}
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="timlands-form">
                          <Field
                            id="code"
                            name="code"
                            placeholder="######"
                            className="timlands-inputs sm"
                            autoComplete="off"
                          />
                          {errors.code && touched.code ?
                            <div style={{ overflow: 'hidden' }}>
                              <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                <p className="text">{errors.code}</p>
                              </motion.div>
                            </div>
                            :
                            null}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="filter-sidebar-panel">
                    <h3 className="title">اختر المستخدم</h3>
                    <div className="filter-cheks">
                        <div className="form-check py-1 pe-4">
                          <input className="form-check-input" type="checkbox" value="" id={"getCategories-"} />
                          <label className="form-check-label" htmlFor={"getCategories-"}>
                            عبد الحميد بومقواس
                          </label>
                        </div>
                        <div className="form-check py-1 pe-4">
                          <input className="form-check-input" type="checkbox" value="" id={"getCategories-"} />
                          <label className="form-check-label" htmlFor={"getCategories-"}>
                            طارق عروي
                          </label>
                        </div>
                    </div>
                  </div>
                  <div className="filter-sidebar-panel">
                    <h3 className="title">التصنيف الرئيسي</h3>
                    <div className="filter-cheks">
                      {getCategories.data.map((e: any) => (
                        <div className="form-check py-1 pe-4" key={e.id}>
                          <input className="form-check-input" type="checkbox" value={e.id} id={"getCategories-" + e.id} />
                          <label className="form-check-label" htmlFor={"getCategories-" + e.id}>
                            {e.name_ar}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-9">
                <FilterContent products={products} />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
Category.getLayout = function getLayout(page: any): ReactElement {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
export default Category
