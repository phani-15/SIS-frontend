import { api } from "../backend"
import { buildFormData, FILE_FIELDS, TYPE_TO_ENDPOINT } from "../utils/helpers"

const ep = (type) => TYPE_TO_ENDPOINT[type] || type

export const fetchMyProfile       = ()              => api.get("/getData?type=total")
export const fetchPortfolioCounts = ()              => api.get("/getCounts")

export const getEntries     = (type)          => api.get(`/portfolio/${ep(type)}`)
export const updateEntry    = (type, id, obj) => api.put(`/portfolio/${ep(type)}/${id}`, { data: obj })
export const deleteEntry    = (type, id)      => api.delete(`/portfolio/${ep(type)}/${id}`)

export function addEntry(type, entries) {
  const mapped = ep(type)
  const ffs = FILE_FIELDS[mapped] || []
  const hasFiles = entries.some((e) => ffs.some((f) => e[f] instanceof File))
  if (hasFiles) return api.post(`/portfolio/${mapped}`, buildFormData(entries, mapped))
  return api.post(`/portfolio/${mapped}`, { data: entries })
}

export const addSkills      = (skills) => api.post("/portfolio/skills", { data: skills })
export const replaceSkills  = (skills) => api.put("/portfolio/skills", { data: skills })
export const removeSkills   = (skills) => api.delete("/portfolio/skills", { data: skills })
