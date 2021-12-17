import Layout from '@/components/Layout/HomeLayout'
import PostsAside from '@/components/PostsAside';
import router from 'next/router';
import React, { ReactElement } from 'react'
import { useCart } from "react-use-cart";
import CartList from '../../components/Cart/CartList';
import useSWR from 'swr'
import Loading from '@/components/Loading';

function index() {
    const {
        isEmpty,
        totalUniqueItems,
        items,
    } = useCart();
    const { data: popularProducts, popularError }: any = useSWR('api/filter?paginate=4&popular')

    const { data: cartList }: any = useSWR('api/cart')
    return (
        <>
            <div className="timwoork-single">
                <div className="row justify-content-md-center">
                    <div className="col-lg-9">
                        {!cartList && <Loading />}
                        {isEmpty ?
                            <div className="cart-nothing">
                                <div className="cart-nothing-inner">
                                    <div className="cart-nothing-img">
                                        <img src="/carticon.png" alt="" />
                                    </div>
                                    <div className="cart-nothing-content">
                                        <h1 className="title">السلة فارغة</h1>
                                        <p className="text">لاتوجد خدمات في سلة المشتريات يمكنك الذهاب إلى تصفح الخدمات</p>
                                    </div>
                                </div>
                            </div> :
                            <div className="timwoork-single-post bg-white mt-4">
                                <div className="timwoork-single-header">
                                    <h1 className="title md"><span className="material-icons material-icons-outlined">shopping_cart</span> سلة المشتريات ({totalUniqueItems})</h1>
                                </div>
                                <CartList listItem={items} />
                                <div className="cart-list-continue">
                                    <button onClick={() => router.push('/cart/bill')} className="btn butt-primary butt-lg ml-0">
                                        اشتري الآن
                                    </button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="container">
                <PostsAside title="الأكثر شعبية" PostData={popularProducts && popularProducts.data.data} isLoading={!popularProducts} isError={popularError} />
            </div>
        </>
    );
}
index.getLayout = function getLayout(page: any): ReactElement {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default index
