import React from "react"
import Button from "../ui/Button"

const CartFooter = ({ items = [], subtotal = 0, onCheckout }) => {
    return (
        <div className="offcanvas-footer border-top p-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="fw-semibold">Subtotal ({items.length} items)</span>
                <span className="fw-bold">${subtotal.toFixed(2)}</span>
            </div>
            <Button 
                variant="primary" 
                className="w-100 mb-2"
                onClick={onCheckout}
            >
                CONTINUE TO CHECKOUT
            </Button>
            <small className="text-muted d-block text-center">
                Psst, get it now before it sells out
            </small>
        </div>
    )
}

export default CartFooter
