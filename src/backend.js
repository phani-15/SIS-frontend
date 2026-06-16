const BASE_URL = "http://localhost:5000/api"

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("token")
  const headers = { "Content-Type": "application/json", ...options.headers }
  if (token) headers["Authorization"] = `Bearer ${token}`

  const res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || "Request failed")
  return data
}

export function login(data) {
  return request("/login", { method: "POST", body: JSON.stringify(data) })
}

export function register(data) {
  return request("/register", { method: "POST", body: JSON.stringify(data) })
}

export function getUserData(userId) {
  return request(`/getData/${userId}`)
}

export function updateUser(userId, data) {
  return request(`/update/${userId}`, { method: "PUT", body: JSON.stringify(data) })
}

export function hodLogin(data) {
  return request("/hod/login", { method: "POST", body: JSON.stringify(data) })
}

export function hodRegister(data) {
  return request("/hod/register", { method: "POST", body: JSON.stringify(data) })
}

export function extractReports(data) {
  return request("/hod/extract-reports", { method: "POST", body: JSON.stringify(data) })
}

export function extractPersonalReports(data) {
  return request("/hod/extract-personal-reports", { method: "POST", body: JSON.stringify(data) })
}
