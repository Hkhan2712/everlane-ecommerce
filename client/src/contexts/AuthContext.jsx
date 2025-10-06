import { createContext, useContext, useState, useEffect } from "react"
import { login, signup, logout} from "../api/auth.js"
import api, { setAccessToken } from "../api/index.js"
import { getClientInfo } from "../utils/clientInfo.js"

const AuthContext = createContext(null)

const parseAuthResult = (res) => {
	const outer = res?.data ?? res
	const payload = outer?.data ?? outer
	if (!payload) return null
	const { id, name, email, accessToken } = payload
	const user = id ? { id, name, email } : null
	return { user, accessToken }
}

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
	let mounted = true
	const init = async () => {
		setLoading(true)
		try {
			const res = await api.post("/auth/refresh-token", {}, { withCredentials: true })
		const { accessToken, user } = res.data
		if (accessToken) setAccessToken(accessToken)
		if (user) {
			setUser(user)
			localStorage.setItem("user", JSON.stringify(user))
		}
		if (mounted) setLoading(false)
		return
		} catch (err) {
			console.warn("Refresh on init failed:", err.message)
		}

		try {
		const savedUser = localStorage.getItem("user")
		if (savedUser) {
			const parsedUser = JSON.parse(savedUser)
			if (parsedUser && mounted) setUser(parsedUser)
		}
		} catch (err) {
			console.error("Auth Context error", err.message)
			localStorage.removeItem("user")
		} finally {
			if (mounted) setLoading(false)
		}
	}
		init()
		return () => { mounted = false }
	}, [])

	const signIn = async (credentials) => {
		try {
			const res = await login(credentials)
			const parsed = parseAuthResult(res)
			if (!parsed?.user) return { success: false, message: "Invalid response from server" }
			setUser(parsed.user)
		
			if (parsed.accessToken) setAccessToken(parsed.accessToken)
			localStorage.setItem("user", JSON.stringify(parsed.user))
			return { success: true }
		} catch (err) {
			const data = err.response?.data
			let message = "Sign-in failed"
			if (data?.errors?.length) message = data.errors.join(", ")
			else if (data?.message) message = data.message
			else if (err.message) message = err.message
			return { success: false, message }
		}
	}

	const signUp = async (payload) => {
		try {
		const { ip, userAgent } = await getClientInfo()
		const res = await signup({ ...payload, ip, userAgent })
		const parsed = parseAuthResult(res)
		if (!parsed?.user) return { success: false, message: "Invalid response from server" }
		setUser(parsed.user)
		if (parsed.accessToken) setAccessToken(parsed.accessToken)
		localStorage.setItem("user", JSON.stringify(parsed.user))
		return { success: true }
		} catch (err) {
		const message = err.response?.data?.message || err.message || "Sign-up failed"
		return { success: false, message }
		}
	}

	const signOut = async () => {
		try {
			console.log(1);
			
			await logout()
		} catch (err) {
			console.error("Sign-out error:", err.message)			
		}
		finally {
			setUser(null)
			setAccessToken(null)
			localStorage.removeItem("user")
		}
	}

	return (
		<AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)
