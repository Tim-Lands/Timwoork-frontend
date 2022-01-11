import React, { ReactElement, useEffect, useState } from 'react'
import Layout from '@/components/Layout/HomeLayout'
import FilterContent from '../../components/products'
import { Field, Form, Formik } from "formik";
import useSWR from 'swr'
import API from '../../config'
import Loading from '@/components/Loading';
import PropTypes from "prop-types";
import Slider from '@mui/material/Slider';
import { setTimeout } from 'timers';
import Tags from '@/components/Tags'

function Category() {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [products, setProducts]: any = useState([])
  const { data: getCategories, error }: any = useSWR('api/get_categories')
  let setValue,setLabel = [] 
   setValue = getCategories && getCategories.data.map((e) => (e.id));
   setLabel = getCategories && getCategories.data.map((e) => (e.name_ar));
  const [selectedTags, setSelectedTags]: any = useState(['']); 

  /********************** price Slider **********************/
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
  };     
  /**----------------------------------------------------------**/

   //filter data 
    async function filterData (){

      setIsLoading(true);
     try {
      setTimeout(() => { 
        setIsLoading(false);
      },1500)  
        const res: any = await API.get(`api/filter?paginate=12&between=price,${priceRange[0]},${priceRange[1]}&category=${selectedTags}`)
        if (res.status === 200) {
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
          categoryID: []
        }}
        onSubmit={async values => {
         
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
                      {/*<Slider
                        getAriaLabel={() => 'Minimum distance shift'}
                        value={priceRange}
                        valueLabelDisplay="auto"
                        onChange={handleChangeSlider}
                        getAriaValueText={valuetext}
                        max={5000}
                        min={0}
                        step={50}
                        disableSwap
                      />*/}
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
                       <Tags values={setValue} labels={setLabel} placeholder="أدخل التصنيفات..." selected={selectedTags =>setSelectedTags(selectedTags)}/>
                  </div>
                  <div className="py-3">
                    <button type="submit" className='btn butt-primary butt-sm' onClick={filterData}>فلترة النتائج</button>
                  </div>
                </div>
              </div>
              <div className="col-md-9">
                <div className="page-header">
                  <h5 className="title">جميع الخدمات</h5>
                </div>
                <FilterContent products={products} isLoading={isLoading} isError={isError} />
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