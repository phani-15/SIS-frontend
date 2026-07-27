import { api } from "../backend"

export const loginUser       = (data)        => api.post("/login", data)
export const registerUser    = (data)        => api.post("/register", data)
export const logoutUser      = ()            => api.post("/logout")
export const forgotPassword  = (email)       => api.post("/forgot-password", { email })
export const verifyOtp       = (token, otp)  => api.post(`/verify-otp/${token}`, { otp })
export const resetPassword   = (token, pass) => api.post(`/reset-password/${token}`, { password: pass })
export const changePassword  = (data)        => api.post("/change-password", data)
