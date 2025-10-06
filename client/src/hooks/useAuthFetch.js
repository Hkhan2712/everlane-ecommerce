import { useAuth } from "../contexts/AuthContext"

const useAuthFetch = () => {
    const { accessToken, refreshAccessToken, logout } = useAuth()

    const authFetch = async (url, options = {}) => {
        let token = accessToken
        const headers = options.headers || {}

        if (token) headers['Authorization'] = `Bearer ${token}`

        let res = await fetch(url, { ...options, headers })

        if (res.status === 401) {
            token = await refreshAccessToken()
            if (!token) {
                logout()
                throw new Error('Session expired')
            }
            headers['Authorization'] = `Bearer ${token}`
            res = await fetch(url, { ...options, headers })
        }

        return res
    }

    return authFetch
}

export default useAuthFetch