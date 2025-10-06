import { createContext, useContext, useState, useEffect } from "react"
import api from "../api"
import { useAuth } from "./AuthContext"
import { toast } from "react-toastify"

const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([])
    const {user, loading: authLoading} = useAuth()
    const normalize = (res) => res?.data?.data?.items ?? []

    const fetchCart = async () => {
        try {
            const res = await api.get("/cart")
            setCartItems(normalize(res))
        } catch (err) {
            console.error("Failed to fetch cart:", err)
        } finally {
            // setLoading(false)
        }
    }

    useEffect(() => {
        if (!authLoading && user) {
            fetchCart()
        } else if (!authLoading && !user) {
            setCartItems([]) 
        }
        }, [authLoading, user])
    const addToCart = async (productId, quantity = 1) => {
        try {
            const res = await api.post("/cart/items", {productId, quantity })
            setCartItems(normalize(res))
            toast.success("Add item to bag successfully!")
            return { success: true }
        } catch (err) {
            console.error("Add to cart error:", err)
            return { success: false, reason: "api_error" }
        }
    }
    
    const updateItem = async (cartItemId, quantity) => {
        try {
            const res = await api.patch(`/cart/items/${cartItemId}`, { quantity })
            setCartItems(normalize(res))
        } catch (err) {
            console.error("Update item error:", err)
        }
    }

    const increase = (cartItemId) => {
        console.log(cartItemId)
        
        const item = cartItems.find(i => i.product_id === cartItemId)
        if (item) updateItem(cartItemId, item.quantity + 1)
    }

    const decrease = (cartItemId) => {
        console.log(cartItemId)
        
        const item = cartItems.find(i => i.product_id === cartItemId)
        if (item && item.quantity > 1) {
            updateItem(cartItemId, item.quantity - 1)
        } else {
            removeFromCart(cartItemId)
            toast.success("Deleted item from bag successfully!")
        }
    }

    const removeFromCart = async (cartItemId) => {
        try {
            const res = await api.delete(`/cart/items/${cartItemId}`)
            setCartItems(normalize(res))
        } catch (err) {
            console.error("Remove item error:", err)
        }
    }
    
    const removeItems = async (cartId, itemIds) => {
        try {
            const res = await api.delete("/cart/items", { data: { cartId, itemIds } })
            setCartItems(normalize(res))
        } catch (err) {
            console.error("Remove items error:", err)
        }
    }
    const resetCart = async (cartId) => {
        try {
            const res = await api.delete(`/cart/reset/${cartId}`)
            setCartItems(normalize(res))
        } catch (err) {
            console.error("Reset cart error:", err)
        }
    }
    return (
        <CartContext.Provider
        value={{ 
            cartItems, addToCart, updateItem, 
            removeFromCart, removeItems, resetCart,
            increase, decrease    
        }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)
