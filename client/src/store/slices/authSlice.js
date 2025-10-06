import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const API_URL = 'http://localhost:3000/api'

export const login = createAsyncThunk('auth/sign-in', async ({email, password}, thunkAPI) => {
    try {
        const res = await axios.post(`${API_URL}/auth/sign-in`, { email, password}, {withCredentials: true})
        return res.data
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data || {message: 'Login failed'})
    }
})

export const register = createAsyncThunk('auth/sign-up', async ({name, email, password}, thunkAPI) => {
    try {
        const res = await axios.post(`${API_URL}/auth/sign-up`, {name, email, password}, {withCredentials: true})
        return res.data
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data || {message: 'Register failed'})
    }
})

export const logout = createAsyncThunk('auth/sign-out', async (_, thunkAPI) => {
    try {
        await axios.post(`${API_URL}/auth/sign-out`, {}, {withCredentials: true})
        return {}
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data || {message: 'Logout failed'})
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(login.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(login.fulfilled, (state, action) => {
            state.loading = false
            if (action.payload.success) {
            state.user = action.payload.user
            } else {
            state.error = action.payload.message
            }
        })
        .addCase(login.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || 'Login failed'
        })
        .addCase(register.fulfilled, (state, action) => {
            if (action.payload.success) {
            state.user = action.payload.user
            } else {
            state.error = action.payload.message
            }
        })
        .addCase(logout.fulfilled, (state) => {
            state.user = null
        })
    }
})

export default authSlice.reducer