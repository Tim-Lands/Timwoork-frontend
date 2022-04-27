import React, { ReactElement, useState } from "react";
import Layout from "@/components/Layout/HomeLayout";
import FilterContent from "../../components/products";
import { Form, Formik } from "formik";
import useSWR from "swr";
import Loading from "@/components/Loading";
import { MetaTags } from "@/components/SEO/MetaTags";

function Popular() {
    const [pageIndex, setPageIndex] = useState(1);
    const { data: getCategories }: any = useSWR(`api/filter?paginate=12&page=${pageIndex}&sort=count_buying,desc`);
    /**----------------------------------------------------------**/

    return (
        <div className="container py-5">
            <MetaTags
                title={'الخدمات الأكثر شعبية'}
                metaDescription={'الخدمات الأكثر شعبية'}
                ogDescription={'الخدمات الأكثر شعبية'}
            />
            <Formik
                isInitialValid={true}
                initialValues={{
                    categoryID: [],
                }}
                onSubmit={async (values) => {
                    console.log(values);
                }}
            >
                <Form>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-header">
                                <h4 className="title">الخدمات الأكثر شعبية</h4>
                            </div>
                            {!getCategories && <Loading />}
                            <FilterContent
                                size={3}
                                products={getCategories && getCategories.data.data}
                            />
                            {getCategories &&
                                getCategories.length !== 0 &&
                                getCategories.total > getCategories.per_page && (
                                    <div className="p-2 d-flex">
                                        <button
                                            className="btn butt-sm butt-primary me-auto"
                                            onClick={() => setPageIndex(pageIndex + 1)}
                                        >
                                            الصفحة التالية
                                        </button>
                                        <button
                                            className="btn butt-sm butt-primary"
                                            onClick={() => setPageIndex(pageIndex - 1)}
                                        >
                                            الصفحة السابقة
                                        </button>
                                    </div>
                                )}
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}
Popular.getLayout = function getLayout(page: any): ReactElement {
    return <Layout>{page}</Layout>;
};
export default Popular;