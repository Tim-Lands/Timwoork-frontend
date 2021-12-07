import Layout from '@/components/Layout/HomeLayout'
import PostsAside from '@/components/PostsAside';
import router from 'next/router';
import React, { ReactElement } from 'react'
import { useCart } from "react-use-cart";
import CartList from '../../components/Cart/CartList';

const testServices = [
    {
        id: 1,
        title: ' لمصممي المواقع على وجه الخصوص، حيث',
        author: 'عبد الله الهادي',
        rate: 4,
        price: 68,
        postUrl: '/Single',
        thumbnail: '/slide_2.png',
        period: 9,
        buyers: 5,
        userUrl: '/user'
    },
    {
        id: 2,
        title: 'المساحة، لقد تم توليد هذا النص من مولد',
        author: 'ضياء الدين محمد',
        rate: 3,
        price: 93,
        postUrl: '/Single',
        thumbnail: '/photographer.jpg',
        period: 9,
        buyers: 5,
        userUrl: '/user'
    },
    {
        id: 3,
        title: 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس',
        author: 'رقية الرفوع',
        rate: 5,
        price: 13,
        postUrl: '/Single',
        thumbnail: '/slide_3.jpg',
        period: 9,
        buyers: 5,
        userUrl: '/user'
    },
    {
        id: 4,
        title: 'يمكنك أن تولد مثل هذا النص أو العديد',
        author: 'طارق عروي',
        rate: 5,
        price: 40,
        postUrl: '/Single',
        thumbnail: '/homepage.jpg',
        period: 9,
        buyers: 5,
        userUrl: '/user'
    },
]
function index() {
    const {
        isEmpty,
        totalUniqueItems,
        items,
    } = useCart();

    return (
        <>
            <div className="timwoork-single">
                <div className="row justify-content-md-center">
                    <div className="col-lg-9">
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
                <PostsAside title="الخدمات الأكثر شيوعا" PostData={testServices} />
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
