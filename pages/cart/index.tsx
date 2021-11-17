import Layout from '@/components/Layout/HomeLayout'
import PostsAside from '@/components/PostsAside';
import { motion } from 'framer-motion';
import React, { ReactElement } from 'react'
import { useCart } from "react-use-cart";

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
        updateItemQuantity,
        cartTotal,
    } = useCart();
    function pricesTax() {
        let tax = 0
        if (cartTotal <= 20) {
            tax = cartTotal + 1
        } else if (cartTotal > 20 || cartTotal <= 200) {
            tax = (cartTotal * 0.05) + cartTotal
        } else if (cartTotal > 200 || cartTotal <= 1000) {
            tax = (cartTotal * 0.07) + cartTotal
        } else if (cartTotal > 1000) {
            tax = (cartTotal * 0.1) + cartTotal
        }
        return tax
    }
    function isTax() {
        let tax: any = 0
        if (cartTotal <= 20) {
            tax = 1
        } else if (cartTotal > 20 || cartTotal <= 200) {
            tax = cartTotal * 0.05
        } else if (cartTotal > 200 || cartTotal <= 1000) {
            tax = cartTotal * 0.07
        } else if (cartTotal > 1000) {
            tax = cartTotal * 0.1
        }
        return tax
    }

    return (
        <>
            <div className="timwoork-single">
                <div className="row justify-content-md-center">
                    <div className="col-lg-8">
                        <div className="timwoork-single-post bg-white mt-4">
                            <div className="timwoork-single-header">
                                <h1 className="title md"><span className="material-icons material-icons-outlined">shopping_cart</span> سلة المشتريات ({totalUniqueItems})</h1>
                            </div>
                            {isEmpty &&
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
                                </div>
                            }
                            {!isEmpty &&
                                <>
                                    <div className="cart-list">
                                        <ul className="cart-list-item">
                                            {items.map((item) => (
                                                <motion.li initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="cart-item" key={item.id}>
                                                    <div className="d-flex">
                                                        <div className="cart-item-content me-auto">
                                                            <h2 className="title">{item.title}</h2>
                                                            <p className="meta-user"><span className="material-icons material-icons-outlined">person_outline</span> {item.author} | رقم الخدمة: <span className="product-code">214344</span></p>
                                                        </div>
                                                        <div className="cart-item-header me-auto">
                                                            <ul className="prices-list">
                                                                <li><span>عدد المرات: </span>{item.quantity}</li>
                                                                <li><span>السعر: </span>{item.price}$</li>
                                                                <li><strong>الإجمالي: </strong>{item.itemTotal}$</li>
                                                            </ul>
                                                        </div>
                                                        <div className="cart-item-price ml-auto">
                                                            <ul className="price-nav">
                                                                <li>
                                                                    <motion.button
                                                                        whileTap={{ scale: 0.9 }}
                                                                        className="addquantity"
                                                                        onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>
                                                                        <span className="material-icons material-icons-outlined">add</span>
                                                                    </motion.button>
                                                                </li>
                                                                <li>
                                                                    <motion.button
                                                                        whileTap={{ scale: 0.9 }}
                                                                        className="removequantity"
                                                                        onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>
                                                                        <span className="material-icons material-icons-outlined">remove</span>
                                                                    </motion.button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </motion.li>
                                            ))}
                                            <li className="cart-item">
                                                <div className="d-flex">
                                                    <div className="cart-item-content me-auto">
                                                        <h2 className="title">المجموع</h2>
                                                    </div>
                                                    <div className="cart-item-header me-auto">
                                                        <ul className="prices-list">
                                                            <li><span>سعر التحويل: </span>{isTax().toPrecision(3)}$</li>
                                                            <li><span>اجمالي السعر: </span>{cartTotal}$</li>
                                                            <li><strong>المجموع: </strong>{pricesTax()}$</li>
                                                        </ul>
                                                    </div>
                                                    <div className="cart-item-price ml-auto">
                                                        <h4 className="price-title-total">
                                                            ${pricesTax().toLocaleString()}
                                                        </h4>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="cart-list-continue">
                                        <button type="submit" className="btn butt-primary butt-lg ml-0">
                                            اشتري الآن
                                        </button>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <PostsAside title="الخدمات الأكثر شيوعا" PostData={testServices} />
        </>
    );
}
index.getLayout = function getLayout(page): ReactElement {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default index
