import React, { useEffect, useRef } from 'react'
import { Offcanvas as OffcanvasJS } from 'bootstrap'
import CartItem from '../cart/CartItem'
import CartFooter from '../cart/CartFooter'
import Button from '../ui/Button'
import { CloseIcon } from '../icons'
import { useCart } from '../../contexts/CartContext'
import { useNavigate } from 'react-router-dom'

const Cart = ({ show, onHide }) => {
    const offcanvasRef = useRef(null);
    const offcanvasInstanceRef = useRef(null);
    const navigate = useNavigate()
    
    const { cartItems, removeFromCart, increase, decrease } = useCart()

    useEffect(() => {
        const node = offcanvasRef.current;

        if (!node) return;

        if (!offcanvasInstanceRef.current) {
            offcanvasInstanceRef.current = new OffcanvasJS(node);
        }

        const handleHide = () => {
            if (typeof onHide === 'function') {
                onHide();
            }
        };

        node.addEventListener('hide.bs.offcanvas', handleHide);

        if (show) {
            offcanvasInstanceRef.current.show();
        } else {
            offcanvasInstanceRef.current.hide();
        }

        return () => {
            node.removeEventListener('hide.bs.offcanvas', handleHide);
        };
    }, [show, onHide]);
    
    const handleCheckout = () => {
        if (offcanvasInstanceRef.current) {
            offcanvasInstanceRef.current.hide()
        }
        navigate("/checkout")
    }

    return (
        <div
            ref={offcanvasRef}
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="cartOffcanvas"
            aria-labelledby="cartOffcanvasLabel"
            >
            <div className="offcanvas-header d-flex justify-content-between">
                <h4 className="offcanvas-title">Your Cart</h4>
                <Button 
                    style={{padding: ".5rem .5rem"}}
                    className="border-0"
                    as="button" type="button" data-bs-dismiss="offcanvas"
                    aria-label="Close" onClick={onHide}
                >
                <CloseIcon width={18} color="currentColor"/>
                </Button>
            </div>

            <div className="offcanvas-body d-flex flex-column h-100">
                <div className="flex-grow-1 overflow-auto">
                {cartItems.length === 0 ? (
                    <p>Empty</p>
                ) : (
                    cartItems.map(item => (        
                    <CartItem 
                        key={item.id}
                        item={item}
                        onRemove={() => removeFromCart(item.product_id)}
                        onIncrease={() => increase(item.product_id)}
                        onDecrease={() => decrease(item.product_id)}
                    />
                    ))
                )}
                </div>

                <CartFooter 
                    items={cartItems}
                    subtotal={cartItems.reduce((sum,i) => sum + i.sale_price * i.quantity, 0)}
                    onCheckout={handleCheckout}    
                />
            </div>
        </div>
    )
}

export default Cart