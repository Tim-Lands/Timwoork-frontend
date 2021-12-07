import React, { ReactElement } from 'react'
import { useCart } from "react-use-cart";
import CartPost from './CartPost';
import PropTypes from "prop-types";

function CartList({ listItem }): ReactElement {
    const {
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
                        itemTotal={item.itemTotal}
                        developments={item.developments}
                        updateItemQuantity={updateItemQuantity} />
                ))}
                <li className="cart-item">
                    <div className="d-flex">
                        <div className="cart-item-content me-auto" style={{ padding: 15 }}>
                            <h2
                                className="title"
                                style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    color: '#444',
                                    margin: 0,
                                    marginBottom: 8,
                                }}
                            >المجموع</h2>
                        </div>
                        <div className="cart-item-header me-auto" style={{ padding: 12 }}>
                            <ul
                                className="prices-list"
                                style={{
                                    margin: 0,
                                    padding: 0,
                                    listStyle: 'none',
                                }}
                            >
                                <li style={{ fontSize: 13, color: '#777', }}><span>سعر التحويل: </span>{isTax().toPrecision(3)}$</li>
                                <li style={{ fontSize: 13, color: '#777', }}><span>اجمالي السعر: </span>{cartTotal}$</li>
                                <li style={{ fontSize: 13, color: '#777', }}><strong>المجموع: </strong>{pricesTax()}$</li>
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
    )
}
CartList.propTypes = {
    listItem: PropTypes.array,
};

export default CartList
