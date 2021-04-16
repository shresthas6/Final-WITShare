import React from 'react'
import "./Checkout.css";

function Checkout() {
    return (
        <div className="checkout">
            <div className="checkout__left">
                <img 
                    className="checkout__ad"
                    src="https://image.shutterstock.com/image-photo/dollar-sign-american-money-cash-260nw-1486855688.jpg"
                    alt=""

                />
                <div>
                    <h2 className="checkout_title">
                        Your shopping Basket
                    </h2>
                </div>
            </div>

            <div className="checkout__right">
                <h2>The subtotal will go here</h2>
            </div>

        </div>
    )
}

export default Checkout;
