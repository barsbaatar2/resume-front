import axios from "axios"

interface User {
  id: number
  email: string
  firstName: string
  lastName: string
}

interface Experience {
  id: number
  name: string
  year: number
}

const API_BASE_URL = "https://test.ionsapp.com/api/v1"

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

export const signUp = async (userData: {
  email: string
  firstName: string
  lastName: string
  password: string
}) => {
  try {
    const response = await api.post("/users", userData)
    return response.data
  } catch (error) {
    console.error("Error during sign up:", error)
    throw error
  }
}

export const login = async (credentials: { email: string; password: string }) => {
  try {
    const response = await api.post("/auth/login", credentials)
    return response.data
  } catch (error) {
    console.error("Error during login:", error)
    throw error
  }
}

export const setAuthToken = (token: string) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`
}

export const fetchUserProfile = async () => {
  try {
    const response = await api.get("/users")
    return response.data.result
  } catch (error) {
    console.error("Error fetching user profile:", error)
    throw error
  }
}

export const generateResumeApi = async () => {
  try {
    const response = await api.post("/users/resume")
    return response.data.result
  } catch (error) {
    console.error("Error fetching user profile:", error)
    throw error
  }
}

export const fetchUserSkills = async () => {
  try {
    const response = await api.get("/user/skills")
    return response.data.result
  } catch (error) {
    console.error("Error fetching user skills:", error)
    throw error
  }
}

export const createUserSkill = async (skillName: string) => {
  try {
    const response = await api.post("/user/skills", { name: skillName })
    return response.data.result
  } catch (error) {
    console.error("Error creating user skill:", error)
    throw error
  }
}

export const deleteUserSkill = async (skillId: number) => {
  try {
    await api.delete(`/user/skills/${skillId}`)
  } catch (error) {
    console.error("Error deleting user skill:", error)
    throw error
  }
}

export const fetchAllSkills = async () => {
  try {
    const response = await api.get("/user/skills/list")
    return response.data.result
  } catch (error) {
    console.error("Error fetching all skills:", error)
    throw error
  }
}

export const updateUserProfile = async (profileData: Partial<User>) => {
  try {
    const response = await api.put("/users", profileData)
    return response.data.result
  } catch (error) {
    console.error("Error updating user profile:", error)
    throw error
  }
}

export const uploadProfilePicture = async (base64Image: string) => {
  try {
    const response = await api.put("/users", { avatar: base64Image })
    return response.data.result
  } catch (error) {
    console.error("Error uploading profile picture:", error)
    throw error
  }
}

export const fetchUserExperiences = async () => {
  try {
    const response = await api.get("/user/experiences")
    return response.data.result
  } catch (error) {
    console.error("Error fetching user experiences:", error)
    throw error
  }
}

export const createUserExperience = async (experienceData: { name: string; year: number }) => {
  try {
    const response = await api.post("/user/experiences", experienceData)
    return response.data.result
  } catch (error) {
    console.error("Error creating user experience:", error)
    throw error
  }
}

export const updateUserExperience = async (experienceId: number, experienceData: { name: string; year: number }) => {
  try {
    const response = await api.put(`/user/experiences/${experienceId}`, experienceData)
    return response.data.result
  } catch (error) {
    console.error("Error updating user experience:", error)
    throw error
  }
}

export const deleteUserExperience = async (experienceId: number) => {
  try {
    await api.delete(`/user/experiences/${experienceId}`)
  } catch (error) {
    console.error("Error deleting user experience:", error)
    throw error
  }
}

