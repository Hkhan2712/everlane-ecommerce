import api from "./index"

export const getCart = async () => {
    const res = await api.get("/cart")
    return res.data
}

export const addToCart = async (item) => {
    const res = await api.post("/cart", item)
    return res.data
}

export const updateCartItem = async (itemId, updates) => {
    const res = await api.put(`/cart/${itemId}`, updates)
    return res.data
}

export const removeCartItem = async (itemId) => {
    const res = await api.delete(`/cart/${itemId}`)
    return res.data
}

export const clearCart = async () => {
    const res = await api.delete("/cart")
    return res.data
}
