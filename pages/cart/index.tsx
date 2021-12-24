import Layout from '@/components/Layout/HomeLayout'
import PostsAside from '@/components/PostsAside';
import API from '../../config'
import React, { ReactElement, useEffect, useState } from 'react'
//import CartList from '../../components/Cart/CartList';
import useSWR, { mutate } from 'swr'
import Cookies from 'js-cookie'
import Loading from '@/components/Loading';
import CartPost from '@/components/Cart/CartPost';
import { message, Spin } from 'antd';
import { MetaTags } from '@/components/SEO/MetaTags';

function index() {
    const { data: popularProducts, popularError }: any = useSWR('api/filter?paginate=4&popular')
    const [isLoading, setIsLoading] = useState(false)
    const { data: cartList }: any = useSWR('api/cart')
    const deleteItem = async (id: any) => {
        const token = Cookies.get('token')
        setIsLoading(true)
        try {
            const res = await API.post(`api/cart/cartitem/delete/${id}`, null, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            // Authentication was successful.
            if (res.status === 200) {
                setIsLoading(false)
                message.success('لقد تم التحديث بنجاح')
                mutate('api/cart')
            }
        } catch (error: any) {
            setIsLoading(false)
            message.error('حدث خطأ غير متوقع')
        }
    }
    const updateItem = async (id: any, values: any) => {
        const token = Cookies.get('token')
        setIsLoading(true)
        try {
            const res = await API.post(`api/cart/cartitem/update/${id}`, values, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            // Authentication was successful.
            if (res.status === 200) {
                setIsLoading(false)
                message.success('لقد تم التحديث بنجاح')
                mutate('api/cart')
            }
        } catch (error: any) {
            setIsLoading(false)
            message.error('حدث خطأ غير متوقع')
        }
    }
    const [isDisable, setIsDisabled] = useState(true)
    const buyNowBtn = async () => {
        if (cartList && cartList.data.cart_items_count == 0) {
            message.error('لا يمكنك الشراء الآن لأن السلة فارغة')
        } else {
            message.success('يمكنك الشراء الآن')
        }
    }
    useEffect(() => {
        if (cartList && cartList.data.cart_items_count == 0) {
            setIsDisabled(true)
        } else {
            setIsDisabled(false)
        }
    }, [isDisable])
    return (
        <>
            <MetaTags
                title={'سلة المشتريات - تيموورك'}
                metaDescription={'سلة المشتريات - تيموورك'}
                ogDescription={'سلة المشتريات - تيموورك'}
            />
            <div className="timwoork-single">
                <div className="row justify-content-md-center">
                    <div className="col-lg-9">
                        {!cartList && <Loading />}
                        {cartList && cartList.data == null ?
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
                            <Spin spinning={isLoading}>
                                <div className="timwoork-single-post bg-white mt-4">
                                    <div className="timwoork-single-header">
                                        <h1 className="title md"><span className="material-icons material-icons-outlined">shopping_cart</span> سلة المشتريات </h1>
                                    </div>
                                    {/*<CartList listItem={cartList && cartList.data.cart_items} />*/}
                                    <div className="cart-list">
                                        <ul className="cart-list-item" style={{ listStyle: 'none', margin: 0, padding: 0, }}>
                                            {cartList && cartList.data.cart_items.map((e: any) => (
                                                <CartPost
                                                    key={e.id}
                                                    id={e.id}
                                                    quantity={e.quantity}
                                                    title={e.title_product}
                                                    product_id={e.product_id}
                                                    price={e.price_product_spicify}
                                                    itemTotal={e.price_product}
                                                    deleteItem={deleteItem}
                                                    updateItem={updateItem}
                                                    developments={e.cart_item_developments} />
                                            ))}
                                            <li className="cart-item">
                                                <div className="d-flex">
                                                    <div className="cart-item-header me-auto" style={{ padding: 12 }}>
                                                        <ul
                                                            className="prices-list"
                                                            style={{
                                                                margin: 0,
                                                                padding: 0,
                                                                listStyle: 'none',
                                                            }}
                                                        >
                                                            <li style={{ fontSize: 13, color: '#777', }}><span>سعر التحويل: </span>{cartList && cartList.data.tax}$</li>
                                                            <li style={{ fontSize: 13, color: '#777', }}><span>اجمالي السعر: </span>{cartList && cartList.data.total_price}$</li>
                                                            <li style={{ fontSize: 13, color: '#777', }}><strong>المجموع: </strong>{cartList && cartList.data.price_with_tax}$</li>
                                                        </ul>
                                                    </div>
                                                    <div className="cart-item-price ml-auto">
                                                        <h4 className="price-title-total">
                                                            ${cartList && cartList.data.price_with_tax}
                                                        </h4>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="cart-list-continue">
                                        <button onClick={buyNowBtn} disabled={isDisable} className="btn butt-primary butt-lg ml-0">
                                            اشتري الآن
                                        </button>
                                    </div>
                                </div>
                            </Spin>
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
