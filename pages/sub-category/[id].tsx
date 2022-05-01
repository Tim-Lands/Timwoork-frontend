import React, { ReactElement, useState, useEffect } from 'react'
import PropTypes from "prop-types";
import Layout from '@/components/Layout/HomeLayout'
import Categories from '@/components/Categories';
import useSWR from 'swr';
import router from "next/router";
function SubCategory({ query }): ReactElement {
    const { data: subCategories }: any = useSWR(`api/get_categories/${query.id}`)
    const [subCategoriesState, setSubCategoriesState] = useState(null)
    useEffect(()=>{
        if(subCategories){
            setSubCategoriesState({...subCategories,data:subCategories.data.sub_categories})
        }
    },[subCategories])
    return (
        <>
            <Categories onClickCategory={(id)=>router.push(`/category/${id}`)} categories={subCategoriesState}/>
    </>
    )

}
SubCategory.getLayout = function getLayout(page: any): ReactElement {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default SubCategory
SubCategory.getInitialProps = ({ query }) => {
    return { query }
}
SubCategory.propTypes = {
    query: PropTypes.any,
}