import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
    withCredentials: true,
})

let accessToken = null

export const setAccessToken = (token) => {
  	accessToken = token
}

export const getAccessToken = () => accessToken

api.interceptors.request.use((config) => {
	if (accessToken) {
		config.headers["Authorization"] = `Bearer ${accessToken}`
	}
	return config
})

api.interceptors.response.use(
    (res) => res,
    async (error) => {
        if (error.response?.status === 401) {
			try {
				const res = await axios.post(
				`${import.meta.env.VITE_API_URL}/auth/refresh-token`,
				{},
				{ withCredentials: true }
				)

				const newToken = res.data.accessToken
				setAccessToken(newToken)

				error.config.headers["Authorization"] = `Bearer ${newToken}`
				return api.request(error.config)
			} catch (err) {
				console.error("Refresh failed", err)
			}
        }
        return Promise.reject(error)
    }
)

export default api
