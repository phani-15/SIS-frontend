import { getUserData, updateUser } from "../backend"

export async function fetchUserData() {
  const userId = localStorage.getItem("userId")
  if (!userId) throw new Error("User not logged in")
  return getUserData(userId)
}

export async function updateUserProfile(userId, payload) {
  return updateUser(userId, payload)
}

export async function addCredential(userId, type, formData) {
  return updateUser(userId, { mode: 3, type, formData })
}
