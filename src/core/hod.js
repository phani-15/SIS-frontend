import { api } from "../backend"

export const hodLogin              = (data) => api.post("/hod/login", data)
export const hodRegister           = (data) => api.post("/hod/register", data)
export const extractReports        = (data) => api.post("/hod/extract-reports", data)
export const extractPersonalReports = (data) => api.post("/hod/extract-personal-reports", data)
