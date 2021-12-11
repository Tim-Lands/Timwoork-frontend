import React, { ReactElement, useEffect, useState } from 'react'
import Layout from '@/components/Layout/HomeLayout'
import FilterContent from '../../components/products'
import { Field, Form, Formik } from "formik";
import useSWR from 'swr'
import API from '../../config'
import Loading from '@/components/Loading';
import PropTypes from "prop-types";

function Category() {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [products, setProducts]: any = useState([])

  //const { data: products, errorP }: any = useSWR(`api/filter?paginate=12&between=price,100,24`)
  const { data: getCategories, error }: any = useSWR('dashboard/categories')
  async function getDataFilter(price_min, price_max , categoryID) {
    setIsLoading(true)
    setIsError(false)
    try {
      const res: any = await API.get(`api/filter?paginate=12&between=price,${price_min},${price_max}&category=${categoryID}`)
      if (res) {
        setIsLoading(false)
        setProducts(res.data.data.data)
        setIsError(false)
      }
    } catch (error) {
      setIsLoading(false)
      setIsError(true)
    }
  }
  async function getData() {
    setIsLoading(true)
    setIsError(false)
    try {
      const res: any = await API.get(`api/filter?paginate=12`)
      if (res) {
        setIsLoading(false)
        setProducts(res.data.data.data)
        setIsError(false)
      }
    } catch (error) {
      setIsLoading(false)
      setIsError(true)
    }
  }
  useEffect(() => {
    getData()
  }, [])
  if (!getCategories) return <Loading />
  if (error) return <div>Error</div>
  return (
    <div className="container py-5">
      <Formik
        isInitialValid={true}
        initialValues={{
          emptyPrice: '',
          price_max: '',
          price_min: '',
          categoryID: []
        }}
        onSubmit={async values => {
          //setFilterVals(`between=price,${values.price_min},${values.price_max}`)
          getDataFilter(
            values.emptyPrice == '1' ? '' : values.price_min, 
            values.emptyPrice == '1' ? '' : values.price_max, 
            values.categoryID
          )
        }}
      >
        {({ values }) => (
          <Form>
            <div className="row">
              <div className="col-md-3">
                <div className="filter-search-sidebar">
                  <div className="filter-sidebar-title">
                    <h3 className="title">فلترة الخدمات</h3>
                  </div>
                  <div className="filter-sidebar-panel">
                    <h3 className="title">السعر</h3>
                    <div className="timlands-form">
                      <p className='text' style={{ marginBottom: 0 }}>{values.price_min}--{values.price_max}</p>
                      <Field type="range" name="price_min" className="form-range" min={5} max={500} step="5" />
                      <Field type="range" name="price_max" className="form-range" min={5} max={500} step="5" />

                      <div className="form-check py-1 pe-2">
                        {values.emptyPrice}
                        <Field
                          className="form-check-input"
                          type="checkbox"
                          name='emptyPrice'
                          value='1'
                          id={"emptyPrice"}
                        />
                        <label className="form-check-label" htmlFor={"emptyPrice"}>
                          تصفية بدون سعر
                        </label>
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
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            name='categoryID'
                            value={`${e.id}`}
                            id={"getCategories-" + e.id}
                          />
                          <label className="form-check-label" htmlFor={"getCategories-" + e.id}>
                            {e.name_ar}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="py-3">
                    <button type="submit" className='btn butt-primary butt-sm'>حفظ التغييرات</button>
                  </div>
                </div>
              </div>
              <div className="col-md-9">
                <div className="page-header">
                  <h5 className="title">جميع الخدمات</h5>
                </div>
                <FilterContent products={products && products} isLoading={isLoading} isError={isError} />
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
Category.propTypes = {
  query: PropTypes.any,
};