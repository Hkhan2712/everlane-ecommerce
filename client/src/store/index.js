import { configureStore } from "@reduxjs/toolkit"
import cartReducer from './slices/cartSlice'
import authReducer from './slices/authSlice'

const rootStore = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
    },
})

export default rootStore