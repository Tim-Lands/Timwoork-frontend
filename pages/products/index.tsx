import React, { ReactElement, useEffect, useState } from 'react'
import Layout from '@/components/Layout/HomeLayout'
import FilterContent from '../../components/products'
import { Field, Form, Formik } from "formik";
import useSWR from 'swr'
import API from '../../config'
import Loading from '@/components/Loading';
import PropTypes from "prop-types";
import Slider from '@mui/material/Slider';
function Category() {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [products, setProducts]: any = useState([])

  const [category, setCategory]: String = useState(''); 


  /********************** Slider **********************/
function valuetext(value: number) {
  return `${value}$`;
} 
// Pricing range from 0 to 5000
  const [priceRange, setpriceRange] = React.useState<number[]>([5, 5000]);
  const minDistance = 50; // minimum distance between any two values of price
  const handleChangeSlider = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setpriceRange([Math.min(newValue[0], priceRange[1] - minDistance), priceRange[1]]);
    } else {
      setpriceRange([priceRange[0], Math.max(newValue[1], priceRange[0] + minDistance)]);
    }
    filterPrice(priceRange);
    
  };     

   //filter price 
   async function filterPrice (priceRange){

    setTimeout(() => {
      setIsLoading(false)
      console.log(" not waiting")
    }, 3000);

    console.log("  waiting")
    setIsLoading(true)

    if( isError || isLoading ){
       try {
        const res: any = await API.get(`api/filter?paginate=12&between=price,${priceRange[0]},${priceRange[1]}`) 
        if (res.status === 200) {
          setIsLoading(false)
          setProducts(res.data.data.data)
          setIsError(false)
          console.log(products.length)
          console.log(priceRange + "price range") // هذه مصفوفه تحتوي السعر الاقر والسعر الاعلى 
        }
      } catch (error) { 
        setIsLoading(false)
        setIsError(true)
        console.log(priceRange + "price range") // هذه مصفوفه تحتوي السعر الاقر والسعر الاعلى 

      }
    }
   }

  /**-------------------------------------**/

  //filter by  Category

  //const { data: products, errorP }: any = useSWR(`api/filter?paginate=12&between=price,100,24`)
  const { data: getCategories, error }: any = useSWR('api/get_categories')

  async function handleChangeCategory( categoryID) {
    setIsLoading(true)
    setIsError(false)
    try {
      const res: any = await API.get(`api/filter?paginate=12&category=${categoryID}`)
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
         /* getDataFilter(
            values.emptyPrice == '1' ? '' : values.price_min,
            values.emptyPrice == '1' ? '' : values.price_max,
            values.categoryID
          )*/
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
                      <Slider
                        getAriaLabel={() => 'Minimum distance shift'}
                        value={priceRange}
                        valueLabelDisplay="auto"  
                        onChange={handleChangeSlider}
                         getAriaValueText={valuetext}  
                         max={5000}
                         min = {0}
                         step={50}
                        disableSwap
                      />
                    </div>
                  </div>
                  <div className="filter-sidebar-panel">
                    <h3 className="title">اختر المستخدم</h3>
                    <div className="timlands-form">
                      <Field
                        id="username"
                        name="username"
                        placeholder="اسم المستخدم..."
                        className="timlands-inputs"
                        autoComplete="off"
                      />
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
                            onChange={() =>handleChangeCategory(e.id)}
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
                <FilterContent products={ products} isLoading={isLoading} isError={isError} />
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