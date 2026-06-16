import { hodLogin, hodRegister, extractReports, extractPersonalReports } from "../backend"

export async function loginHod(department, password) {
  const data = await hodLogin({ department, password })
  localStorage.setItem("token", data.token)
  localStorage.setItem("hodId", data.hodId)
  localStorage.setItem("hodDepartment", data.department)
  return data
}

export async function registerHod(department, emails) {
  return hodRegister({ department, emails })
}

export async function fetchExtractReports(payload) {
  return extractReports(payload)
}

export async function fetchExtractPersonalReports(payload) {
  return extractPersonalReports(payload)
}
