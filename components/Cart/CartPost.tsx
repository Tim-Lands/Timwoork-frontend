import { motion } from 'framer-motion'
import React, { ReactElement } from 'react'
import PropTypes from "prop-types";

function CartPost({ id, quantity, title, price, itemTotal, updateItemQuantity, developments }): ReactElement {
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
                                        <li key={e.id} className="devloppers-item">
                                            <div className="form-check me-auto">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id={"flexCheckDefault-id" + e.id}
                                                    value={e.price}
                                                //checked={checkedState[index]}
                                                //onChange={() => handleOnChange(index)}
                                                />
                                                <label className="form-check-label" htmlFor={"flexCheckDefault-id" + e.id}>
                                                    {e.title}
                                                </label>
                                            </div>
                                            <div className="devloppers-price ml-auto">
                                                <p className="price-number">{e.price}$</p>
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
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    className="addquantity"
                                    style={{
                                        display: 'flex',
                                        width: 35,
                                        height: 35,
                                        borderRadius: '50%',
                                        alignItems: 'center',
                                        alignContent: 'center',
                                        justifyContent: 'center',
                                        color: '#fff',
                                    }}
                                    onClick={() => updateItemQuantity(id, quantity + 1)}>
                                    <span className="material-icons material-icons-outlined">add</span>
                                </motion.button>
                            </li>
                            <li>
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    className="removequantity"
                                    style={{
                                        display: 'flex',
                                        width: 35,
                                        height: 35,
                                        borderRadius: '50%',
                                        alignItems: 'center',
                                        alignContent: 'center',
                                        justifyContent: 'center',
                                        color: '#fff',
                                    }}
                                    onClick={() => updateItemQuantity(id, quantity - 1)}>
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
    quantity: PropTypes.number,
    author: PropTypes.string,
    itemTotal: PropTypes.number,
    price: PropTypes.number,
    updateItemQuantity: PropTypes.func,
    developments: PropTypes.array,
};

export default CartPost
