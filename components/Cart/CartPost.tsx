import { motion } from 'framer-motion'
import React, { ReactElement, useState } from 'react'
import PropTypes from "prop-types";

function CartPost({ id, quantity, product_id, title, price, itemTotal, developments, deleteItem, updateItem }): ReactElement {
    const [quan, setQuan] = useState(quantity)
    function DevdurationFunc(duration) {
        if (duration == 1) {
            return 'يوم واحد'
        }
        if (duration == 2) {
            return 'يومين'
        }
        if (duration > 2 && duration < 11) {
            return duration + ' أيام '
        }
        if (duration >= 11) {
            return duration + ' يوم '
        }
    }
    return (
        <motion.li initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="cart-item">
            <div className="row">
                <div className="col-md-7">
                    <div className="cart-item-content me-auto" style={{ padding: 15 }}>
                        <h2
                            className="title"
                            style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: '#444',
                                margin: 0,
                                marginBottom: 13,
                            }}>{title}</h2>
                        <div className="panel-aside-body">
                            <ul className="add-devloppers-nav">
                                {developments.map((e: any) => {
                                    return (
                                        <li key={e.development_id} className="devloppers-item">
                                            <div className="form-check me-auto">
                                                <label className="form-check-label" htmlFor={"flexCheckDefault-id" + e.development_id}>
                                                    {e.title}
                                                    <p className="price-duration">ستكون المدة {DevdurationFunc(e.duration)} بمبلغ {e.price}$</p>
                                                </label>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-6 col-md-2">
                    <div className="cart-item-header me-auto" style={{ padding: 12 }}>
                        <ul
                            className="prices-list"
                            style={{
                                margin: 0,
                                padding: 0,
                                listStyle: 'none',
                            }}
                        >
                            <li style={{ fontSize: 13, color: '#777', }}><span>عدد المرات: </span>{quantity}</li>
                            <li style={{ fontSize: 13, color: '#777', }}><span>السعر: </span>{price}$</li>
                            <li style={{ fontSize: 13, color: '#777', }}><strong>الإجمالي: </strong>{itemTotal}$</li>
                        </ul>
                    </div>
                </div>
                <div className="col-6 col-md-3">
                    <div className="cart-item-price ml-auto">
                        <ul
                            className="price-nav"
                            style={{
                                display: 'flex',
                                listStyle: 'none',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <li>
                                <form
                                    onSubmit={() => updateItem(id, { id, product_id, quantity: Number(Math.abs(quan)) })}
                                >
                                    <input
                                        //type="number"
                                        value={quan}
                                        className="timlands-inputs sm"
                                        onChange={(e: any) => setQuan(e.target.value)}
                                        onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                              event.preventDefault();
                                            } 
                                            else { 
                                                setTimeout(() => {
                                                    updateItem(id, { id, product_id, quantity: Number(Math.abs(quan)) })
                                                }, 900);
                                                }                                                
                                          }}
                                    />
                                </form>
                            </li>
                            <li>
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                    className="removequantity"
                                    title='إزالة من السلة'
                                    style={{
                                        display: 'flex',
                                        width: 30,
                                        height: 30,
                                        borderRadius: '50%',
                                        alignItems: 'center',
                                        alignContent: 'center',
                                        justifyContent: 'center',
                                        color: '#fff',
                                    }}
                                    onClick={() => deleteItem(id)}>
                                    <span className="material-icons material-icons-outlined">remove</span>
                                </motion.button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </motion.li>
    )
}
CartPost.propTypes = {
    title: PropTypes.string,
    id: PropTypes.any,
    product_id: PropTypes.any,
    quantity: PropTypes.number,
    author: PropTypes.string,
    itemTotal: PropTypes.number,
    price: PropTypes.number,
    deleteItem: PropTypes.func,
    updateItem: PropTypes.func,
    developments: PropTypes.array,
};

export default CartPost
