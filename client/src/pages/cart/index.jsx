import React, { useEffect, useState } from "react"
import CartItem from "../../components/cart/CartItem"
import OrderSummary from "../../components/cart/OrderSummary"
import Checkout from "../../components/cart/Checkout"
import api from "../../api"
import { useAuth } from "../../contexts/AuthContext"
import styles from "./ShoppingCart.module.css"
import AddressInfo from "../../components/cart/AddressInfo"

const ShoppingCart = () => {
    const { loading } = useAuth()
    const [items, setItems] = useState([])
    const [addresses, setAddresses] = useState([])
    const [defaultAddress, setDefaultAddress] = useState(null)

    useEffect(() => {
        if (!loading) {
            const fetchCart = async () => {
                try {
                    const res = await api.get("/cart")
                    console.log(res)
                    
                    setItems(res.data.data.items || [])
                } catch (err) {
                    console.error(err)
                }
            }
            const fetchAddresses = async () => {
                const res = await api.get('/users/addresses')
                const list = res.data.data || []
                setAddresses(list)
                setDefaultAddress(list.find(a => a.is_default) || null)
            }
            fetchCart()
            fetchAddresses()
        }
    }, [loading])

    const handleSaveAddress = async (newAddress) => {
        try {
            const res = await api.post(`/address`, newAddress)
            const created = res.data.data
            setAddresses([...addresses, created])

            if (created.is_default) {
                setDefaultAddress(created)
            }
        } catch (err) {
            console.error(err)
        }
    }
    const handleRemove = async (id) => {
        await api.delete(`/cart/items/${id}`)
        setItems(items.filter(i => i.product_id !== id))
    }

    const handleIncrease = async (id) => {
        const updated = items.map(i => i.product_id === id ? {...i, quantity: i.quantity + 1} : i)
        setItems(updated)
        await api.patch(`/cart/items/${id}`, { quantity: updated.find(i => i.product_id === id).quantity })
    }

    const handleDecrease = async (id) => {
        const item = items.find(i => i.product_id === id)
        if (item.quantity > 1) {
            const updated = items.map(i => i.product_id === id ? {...i, quantity: i.quantity - 1} : i)
            setItems(updated)
            await api.patch(`/cart/items/${id}`, { quantity: updated.find(i => i.product_id === id).quantity })
        } else {
            handleRemove(id)
        }
    }

    const total = items.reduce((sum, i) => sum + i.sale_price * i.quantity, 0)

    if (loading) return <p>Loading cart...</p>
    console.log(items)
    
    return (
        <div className={`container ${styles.shoppingCart}`}>
            <h2 className="mb-4">Shopping Cart</h2>

            <div className="row">
                <div className="col-md-8">
                    {items.length === 0 ? (
                        <p>Your bag is empty</p>
                    ) : (
                        items.map(item => (
                            <CartItem
                                key={item.product_id}
                                item={item}
                                onRemove={() => handleRemove(item.product_id)}
                                onIncrease={() => handleIncrease(item.product_id)}
                                onDecrease={() => handleDecrease(item.product_id)}
                            />
                        ))
                    )}
                </div>

                <div className="col-md-4">
                    <AddressInfo address={defaultAddress} onSave={handleSaveAddress} />
                    <OrderSummary total={total}/>
                    <Checkout total={total} items={items}/>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCart