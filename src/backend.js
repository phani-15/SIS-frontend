const BASE_URL = "http://localhost:5000/api"

async function request(endpoint, { method = "GET", body, headers = {} } = {}) {
  const config = {
    method,
    credentials: "include",
    headers,
  }
  if (!(body instanceof FormData)) {
    config.headers["Content-Type"] = "application/json"
  }
  if (body != null) {
    config.body = body instanceof FormData ? body : JSON.stringify(body)
  }
  const res = await fetch(`${BASE_URL}${endpoint}`, config)
  const data = await res.json()
  if (!res.ok) throw new Error(data.error?.message || data.error || "Request failed")
  return data
}

export const api = {
  get:    (url)             => request(url),
  post:   (url, body)       => request(url, { method: "POST", body }),
  put:    (url, body)       => request(url, { method: "PUT", body }),
  delete: (url, body)       => request(url, { method: "DELETE", body }),
}
