import React from "react"

const OrderSummary = ({ total }) => {
    return (
        <div className="card p-3 mb-3 shadow-sm">
            <h5 className="mb-3">Order Summary</h5>
            <div className="d-flex justify-content-between">
                <span>Subtotal</span>
                <strong>$ {total.toLocaleString()}</strong>
            </div>
            <div className="d-flex justify-content-between">
                <span>Shipping</span>
                <strong>Free</strong>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
                <span>Total</span>
                <strong>$ {total.toLocaleString()}</strong>
            </div>
        </div>
    )
}

export default OrderSummary
