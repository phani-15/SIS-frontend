import { login, register } from "../backend"

export async function loginUser(studentId, password) {
  const data = await login({ data: studentId, password })
  localStorage.setItem("token", data.token)
  localStorage.setItem("userId", data.userId)
  return data
}

export async function registerUser(email, phone) {
  return register({ email, phone })
}
