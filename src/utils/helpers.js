
export const FILE_FIELDS = {
  internship: ["certificate"],
  placement: ["offerLetter"],
  certification: ["certificate"],
  extraCurricular: ["certificate"],
  coCurricular: ["certificate"],
  competition: ["certificate"],
  project: ["certificate"],
  professionalBody: ["membershipCertificate"],
  conferencePaper: ["conferenceCertificate", "conferencePaperFirstPage"],
  patent: ["document"],
}

export const PORTFOLIO_TYPES = [
  "patent", "internship", "placement", "certification",
  "extraCurricular", "coCurricular", "scholarship", "competition",
  "project", "entranceExam", "professionalBody",
  "journalPublication", "conferencePaper", "skills",
]

export const TYPE_TO_ENDPOINT = {
  competitions: "competition",
  projects: "project",
  professionalBodies: "professionalBody",
  scholarships: "scholarship",
  entranceExaminations: "entranceExam",
}

export const PORTFOLIO_TYPES_WITH_FILES = Object.keys(FILE_FIELDS)

export const BACKEND_URL = "http://localhost:5000"

export const FILTER_MAP = {
  degreeCode: { "B.Tech": "A", "M.Tech": "M" },
  entryTypeCode: { "Regular": 1, "Lateral": 2 },
  graduationStatus: { "Pursuing": "studying", "Graduated": "graduated", "Dropout": "dropout" },
  gender: { "Male": "male", "Female": "female" },
}

export function mapFilters(raw) {
  const mapped = {}
  for (const [key, value] of Object.entries(raw)) {
    if (!value) { mapped[key] = value; continue }
    const map = FILTER_MAP[key]
    mapped[key] = map ? (map[value] ?? value) : value
  }
  return mapped
}

export function fileUrl(path) {
  if (!path || typeof path !== "string") return null
  if (path.startsWith("http://") || path.startsWith("https://")) return path
  return `${BACKEND_URL}/${path.replace(/^\/+/, "")}`
}

export function buildFormData(entries, type) {
  const fileFields = FILE_FIELDS[type] || []
  const fd = new FormData()
  const clean = entries.map((entry, idx) => {
    const obj = { ...entry }
    fileFields.forEach((field) => {
      if (obj[field] instanceof File) {
        fd.append(`${field}_${idx}`, obj[field])
        delete obj[field]
      }
    })
    return obj
  })
  fd.append("data", JSON.stringify(clean))
  return fd
}