import { api } from "../backend"

export const getAdminData = () => api.post("/admin/getData")
