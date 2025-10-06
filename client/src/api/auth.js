import api, { setAccessToken } from "./index"

export const login = async (credentials) => {
  const res = await api.post("/auth/sign-in", credentials)
  const { accessToken } = res.data
  setAccessToken(accessToken)
  return res.data
}

export const signup = async (data) => {
  const res = await api.post("/auth/sign-up", data)
  return res.data
}

export const logout = async () => {
  const res = await api.post("/auth/sign-out")
  localStorage.removeItem("user")
  setAccessToken(null)
  return res.data
}

export const getProfile = async () => {
  const res = await api.get("/auth/profile")
  return res.data
}
