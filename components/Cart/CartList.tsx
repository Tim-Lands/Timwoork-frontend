import React, { ReactElement } from 'react'
import CartPost from './CartPost';
import PropTypes from "prop-types";

function CartList({ listItem }): ReactElement {

    return (
        <div className="cart-list">
            <ul className="cart-list-item" style={{ listStyle: 'none', margin: 0, padding: 0, }}>
                {listItem.map((item: any) => (
                    <CartPost
                        key={item.id}
                        id={item.id}
                        quantity={item.quantity}
                        title={item.title}
                        author={item.author}
                        price={item.price}
                        itemTotal={item.total_price}
                        developments={item.developments} />
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
                                <li style={{ fontSize: 13, color: '#777', }}><span>سعر التحويل: </span>{788}$</li>
                                <li style={{ fontSize: 13, color: '#777', }}><span>اجمالي السعر: </span>{979}$</li>
                                <li style={{ fontSize: 13, color: '#777', }}><strong>المجموع: </strong>{54}$</li>
                            </ul>
                        </div>
                        <div className="cart-item-price ml-auto">
                            <h4 className="price-title-total">
                                ${878}
                            </h4>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}
CartList.propTypes = {
    listItem: PropTypes.array,
};

export default CartList
